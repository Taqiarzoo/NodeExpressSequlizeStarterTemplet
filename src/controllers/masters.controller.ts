import { NextFunction, Request, Response } from "express";
import AddressType from "../models/address_type.model";
import Area from "../models/area.model";
import GaliMohalla from "../models/gali_mohalla.model";
import LastNames from "../models/last_names.model";
import MemberType from "../models/member_type.model";



class MastersController {
  public static selfInstance: MastersController = null;

  public static getInstance() {
    if (MastersController.selfInstance) {
      return MastersController.selfInstance;
    }
    this.selfInstance = new MastersController();
    return this.selfInstance;
  }


 

    public async getArea(req: Request, res: Response, next: NextFunction) {
        console.log(req.query)
        await Area.findAll({
            where:{
                countryId:req.query.countryId,
                stateId:req.query.stateId,
                cityId:req.query.cityId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                areas: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async createArea(req: Request, res: Response, next: NextFunction) {
        await Area.create({
            name:req.body.name,
            countryId:req.body.countryId,
            stateId:req.body.stateId,
            cityId:req.body.cityId
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Area Created Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async updateArea(req: Request, res: Response, next: NextFunction) {
        await Area.update({
            name:req.body.name,
            countryId:req.body.countryId,
            stateId:req.body.stateId,
            cityId:req.body.cityId
        },{
            where:{
                id:req.query.areaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Area Updated Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async deleteArea(req: Request, res: Response, next: NextFunction) {
        await Area.destroy({
            where:{
                id:req.query.areaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                message:"Area Deleted Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }



    public async getGalliMohalla(req: Request, res: Response, next: NextFunction) {
        await GaliMohalla.findAll({
            where:{
                areaId:req.query.areaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                galli_mohalla: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }


    public async createGalliMohalla(req: Request, res: Response, next: NextFunction) {
        await GaliMohalla.create({
            name:req.body.name,
            areaId:req.body.areaId
            
        }).then((data:any)=>{
            res.send({
                status: 1,
                data:data,
                message: "Galli Mohalla create Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async updateGalliMohalla(req: Request, res: Response, next: NextFunction) {
        await GaliMohalla.update({
            name:req.body.name,
            areaId:req.body.areaId
            
        },{
            where:{
                id:req.body.galiMohallaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data:data,
                message: "Galli Mohalla create Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async deleteGalliMohalla(req: Request, res: Response, next: NextFunction) {
        await GaliMohalla.destroy({
            where:{
                id:req.body.galiMohallaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                message: "Galli Mohalla Deleted Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }



    public async getLastNames(req: Request, res: Response, next: NextFunction) {
        await LastNames.findAll({
            where:{
                galiMohallaId:req.query.galiMohallaId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                last_names: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async createLastNames(req: Request, res: Response, next: NextFunction) {
        await LastNames.create({
            name:req.body.name,
            galiMohallaId:req.body.galiMohallaId
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message: "Last Name Created Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async updateLastNames(req: Request, res: Response, next: NextFunction) {
        await LastNames.update({
            name:req.body.name,
            galiMohallaId:req.body.galiMohallaId
        },{
            where:{
                id:req.query.lastNameId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Last Name Updated Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async deleteLastNames(req: Request, res: Response, next: NextFunction) {
        await LastNames.destroy({
            where:{
                id:req.query.lastNameId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                message:"Last Name Deleted Sussfully"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }



    public async getMembershipType(req: Request, res: Response, next: NextFunction) {
        await MemberType.findAll().then((data:any)=>{
            res.send({
                status: 1,
                membership_types: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async createMembershipType(req: Request, res: Response, next: NextFunction) {
        await MemberType.create({
            name:req.body.membership_name
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Membership Type Sussfully Created"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async updateMembershipType(req: Request, res: Response, next: NextFunction) {
        await MemberType.update({
            name:req.body.membership_name
        },{
            where:{
                id:req.query.membershipTypeId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Membership Type Sussfully Updated"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async deleteMembershipType(req: Request, res: Response, next: NextFunction) {
        await MemberType.destroy({
            where:{
                id:req.query.membershipTypeId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                message:"Membership Type Sussfully Deleted"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    


    public async getAddressType(req: Request, res: Response, next: NextFunction) {
        await AddressType.findAll().then((data:any)=>{
            res.send({
                status: 1,
                address_type: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async createAddressType(req: Request, res: Response, next: NextFunction) {
        await AddressType.create({
            type:req.body.type
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Address Type Sussfully Created"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async updateAddressType(req: Request, res: Response, next: NextFunction) {
        await AddressType.update({
            type:req.body.type
        },{
            where:{
                id:req.query.addressTypeId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Address Type Sussfully Updated"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async deleteAddressType(req: Request, res: Response, next: NextFunction) {
        await AddressType.destroy({
            where:{
                id:req.query.addressTypeId
            }
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data,
                message:"Address Type Sussfully Deleted"
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

}

export default MastersController.getInstance()