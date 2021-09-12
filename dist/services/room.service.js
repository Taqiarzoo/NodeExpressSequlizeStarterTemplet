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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWinner = exports.addParticipants = exports.createRoom = void 0;
const commission_model_1 = __importDefault(require("../models/commission.model"));
const config_model_1 = __importDefault(require("../models/config.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const transaction_model_1 = require("../models/transaction.model");
const wallet_model_1 = require("../models/wallet.model");
exports.createRoom = (name, mode, stake, state) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_model_1.default.create({
        name: name,
        mode: mode,
        stake: stake,
        gameState: state
    });
    return room;
});
exports.addParticipants = (participants, roomId, stake, mode) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_model_1.default.findOne({
        where: {
            name: roomId,
            stake: stake,
            mode: mode
        }
    });
    room.gameState = 'ongoing';
    room.participants = JSON.stringify(participants);
    yield room.save();
    return true;
});
exports.updateWinner = (result, roomId, stake, mode) => __awaiter(void 0, void 0, void 0, function* () {
    let winAmount = 0;
    let wallet = yield wallet_model_1.Wallet.findOne({
        where: {
            userId: result[0]
        }
    });
    let commission = yield config_model_1.default.findByPk(1);
    winAmount = parseFloat(stake.toString()) * 2 * ((100 - parseFloat(commission.percentage.toString())) / 100);
    wallet.balance = parseFloat(wallet.balance.toString()) + winAmount;
    yield transaction_model_1.Transaction.create({
        type: 'credit',
        date: Date.now(),
        description: 'Game Won',
        amount: winAmount,
        balance: wallet.balance,
        userId: wallet.userId,
        roomID: roomId,
        walletId: wallet.id
    });
    yield commission_model_1.default.create({
        roomName: roomId,
        stake: stake,
        poolAmount: stake * 2,
        commission: parseFloat(stake.toString()) * 2 * ((parseFloat(commission.percentage.toString())) / 100),
        transactionDate: new Date(Date.now())
    });
    yield wallet.save();
    //todo - commission query
    let room = yield room_model_1.default.findOne({
        where: {
            name: roomId,
            stake: stake,
            mode: mode
        }
    });
    room.gameState = 'gameover';
    room.result = JSON.stringify(result);
    yield room.save();
    return winAmount;
});
