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
const config_model_1 = __importDefault(require("../models/config.model"));
class ConfigController {
    static getInstance() {
        if (ConfigController.selfInstance) {
            return ConfigController.selfInstance;
        }
        this.selfInstance = new ConfigController();
        return this.selfInstance;
    }
    // public async GetStakes(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     let stakes = await Stake.findAll({
    //       where: {
    //         enabled: true
    //       }
    //     });
    //     let commission = await Config.findByPk(1);
    //     let finalStake: any[] = [];
    //     for (let stake of stakes) {
    //       finalStake.push(JSON.parse(JSON.stringify(stake)));
    //       finalStake[finalStake.length - 1].pool = (parseFloat(stake.stake.toString()) * 2) - parseFloat(stake.stake.toString()) * 2 * (commission.percentage / 100);
    //     }
    //     res.send({
    //       status: 1,
    //       stakes: finalStake
    //     })
    //   } catch (e) {
    //     next(e);
    //   }
    // }
    GetConfiguration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Message In controller");
                let config = yield config_model_1.default.findAll().then((data) => {
                    console.log("data");
                    console.log(data);
                    res.send({
                        status: 1,
                        config: data
                    });
                });
            }
            catch (e) {
                res.send({
                    message: 'Big Error'
                });
            }
        });
    }
    UpdateConfig(req, res, next) {
        let { supportMail, supportNumber, withdrawnumber, version, appURL, commission } = req.body;
        console.log("Message In controller update");
        config_model_1.default.findOrCreate({
            where: {
                id: 2
            }
        }).then(([...result]) => __awaiter(this, void 0, void 0, function* () {
            console.log(result[0]);
            let config = result[0];
            config.supportEmail = supportMail;
            config.supportNumber = supportNumber;
            config.walletNumber = withdrawnumber;
            config.gameVersion = version;
            config.updateURL = appURL;
            config.percentage = commission;
            yield config.save();
            res.redirect('/');
        })).catch((e) => {
            res.status(500).send(e);
        });
    }
}
ConfigController.selfInstance = null;
exports.default = ConfigController.getInstance();
