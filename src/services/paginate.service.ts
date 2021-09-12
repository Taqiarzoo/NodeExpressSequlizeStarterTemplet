
export const paginate = async(model: any, pageNumber: number, pageLimit: number, search = {}, order: any[] = [], options: any) => {
    try {
        const limit = pageLimit || 10;
        const page = pageNumber || 1;

        // create an options object
        options.offset = getOffset(page, limit);
        options.limit = limit;
        options.distinct = true

        // check if the search object is empty
        if (Object.keys(search).length) {
            options = {...search, ...options };
        }

        // check if the order array is empty
        if (order && order.length) {
            options['order'] = order;
        }

        // take in the model, take in the options
        let { count, rows } = await model.findAndCountAll(options);

        if (Array.isArray(count)) {
            count = count.length;
        }

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            lastPage: Math.ceil(count/limit),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error) {
        console.log(error);
    }
}

const getOffset = (page: number, limit: number) => {
    return (page * limit) - limit;
}

const getNextPage = (page: number, limit: number, total: number) => {
    if ((total / limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page: number) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}