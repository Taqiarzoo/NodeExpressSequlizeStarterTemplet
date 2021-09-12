import { NextFunction, Request, Response } from "express";
import Config from "../models/config.model";

import { paginate } from "../services/paginate.service";

class UserController {
    public static selfInstance: UserController = null;

    public static getInstance() { 
        if (UserController.selfInstance) {
            return UserController.selfInstance;
        }
        this.selfInstance = new UserController();
        return this.selfInstance;
    }

//     public async GetWallet(req: Request, res: Response, next: NextFunction) {
//         const user: any = req.user;
//         try {
//             let wallet = await Wallet.findOne({
//                 where: {
//                     userId: user.id
//                 },
//                 include: [
//                     {
//                         model: Transaction,
//                         limit: 10,
//                         order: [['createdAt', 'desc']]
//                     }
//                 ]
//             });
//             res.send({
//                 status: 1,
//                 wallet: wallet
//             })
//         } catch (e) {
//             next(e);
//         }
//     }

//     public async getTransactions(req: Request, res: Response, next: NextFunction) {
//         try {
//             let page = req.query.page ? +req.query.page : 1;
//             let search = req.query.search;
//             let result = await paginate(Transaction, page, 10, {}, [["updatedAt", "desc"]], {
//                 raw: true,
//             });
//             res.send({
//                 status: 1,
//                 result: result
//             })
//         } catch (e) {
//             next(e);
//         }
//     }

//     public async getRooms(req: Request, res: Response, next: NextFunction) {
//         try {
//             let rooms = await RoomInfo.findAll({
//                 where:{
//                     gameState: 'waiting'
//                 }
//             });
//             return res.send({
//                 status: 1,
//                 rooms: rooms
//             })
//         } catch(e) {
//             console.log(e);
//             res.status(500).send({
//                 status: 0,
//                 message: e
//             })
//         }
//     }
 }
export default UserController.getInstance();
