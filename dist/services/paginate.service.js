"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
exports.paginate = (model, pageNumber, pageLimit, search = {}, order = [], options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = pageLimit || 10;
        const page = pageNumber || 1;
        // create an options object
        options.offset = getOffset(page, limit);
        options.limit = limit;
        options.distinct = true;
        // check if the search object is empty
        if (Object.keys(search).length) {
            options = Object.assign(Object.assign({}, search), options);
        }
        // check if the order array is empty
        if (order && order.length) {
            options['order'] = order;
        }
        // take in the model, take in the options
        let { count, rows } = yield model.findAndCountAll(options);
        if (Array.isArray(count)) {
            count = count.length;
        }
        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            lastPage: Math.ceil(count / limit),
            total: count,
            limit: limit,
            data: rows
        };
    }
    catch (error) {
        console.log(error);
    }
});
const getOffset = (page, limit) => {
    return (page * limit) - limit;
};
const getNextPage = (page, limit, total) => {
    if ((total / limit) > page) {
        return page + 1;
    }
    return null;
};
const getPreviousPage = (page) => {
    if (page <= 1) {
        return null;
    }
    return page - 1;
};
