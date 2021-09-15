import { NextFunction, Request, Response } from "express";
import Config from "../models/config.model";


class ConfigController {
  public static selfInstance: ConfigController = null;

  public static getInstance() {
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

  public async GetConfiguration(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Message In controller")
      
      let config = await Config.findAll().then((data:any)=>{

        console.log("data")
        console.log(data)
        res.send({
          status: 1,
          config: data
        })
      })
    } catch (e) {
      res.send({
        message:'Big Error'
      })
    }
  }

  public UpdateConfig(req: Request, res: Response, next: NextFunction) {
    let {
      supportMail,
      supportNumber,
      withdrawnumber,
      version,
      appURL,
      commission
    } = req.body;
    console.log("Message In controller update")
    Config.findOrCreate({
      where: {
        id: 2
      }
    }).then(async ([...result]) => {
      console.log(result[0])
      let config = result[0];
      config.supportEmail = supportMail;
      config.supportNumber = supportNumber;
      config.walletNumber = withdrawnumber;
      config.gameVersion = version;
      config.updateURL = appURL;
      config.percentage = commission;
      await config.save();
      res.redirect('/');
    }).catch((e) => {
      res.status(500).send(e);
    });
  }
}
export default ConfigController.getInstance();
