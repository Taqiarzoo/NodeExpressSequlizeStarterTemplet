import { NextFunction, Request, Response } from "express";
import City from "../models/city.model";
import Country from "../models/country.model";
import State from "../models/state.model";


class CountryStateCityController {
  public static selfInstance: CountryStateCityController = null;

  public static getInstance() {
    if (CountryStateCityController.selfInstance) {
      return CountryStateCityController.selfInstance;
    }
    this.selfInstance = new CountryStateCityController();
    return this.selfInstance;
  }


        public async getCountry(req: Request, res: Response, next: NextFunction) {
                await Country.findAll().then((data:any)=>{
                    res.send({
                        status: 1,
                        countries: data
                    })
                }).catch((err:any)=>{
                    res.send({
                        status: -1,
                        error_message: err.message
                    })
                })
        }

        public async getState(req: Request, res: Response, next: NextFunction) {
            await State.findAll({
                where:{
                    countryId: req.query.countryId
                }
            }).then((data:any)=>{
                res.send({
                    status: 1,
                    states: data
                })
            }).catch((err:any)=>{
                res.send({
                    status: -1,
                    error_message: err.message
                })
            })
        }

        public async getCity(req: Request, res: Response, next: NextFunction) {
            await City.findAll({
                where:{
                    countryId:req.query.countryId,
                    stateId:req.query.stateId
                }
            }).then((data:any)=>{
                res.send({
                    status: 1,
                    cities: data
                })
            }).catch((err:any)=>{
                res.send({
                    status: -1,
                    error_message: err.message
                })
            })
        }
}
export default CountryStateCityController.getInstance()