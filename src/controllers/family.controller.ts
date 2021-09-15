import { NextFunction, Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import Family from "../models/family.model";
import Member from "../models/member.model";
import Relation from "../models/relation.model";

class FamilyController {
    public static selfInstance: FamilyController = null;
  
    public static getInstance() {
      if (FamilyController.selfInstance) {
        return FamilyController.selfInstance;
      }
      this.selfInstance = new FamilyController();
      return this.selfInstance;
    }


    public async getFamily(req: Request, res: Response, next: NextFunction) {
        await Family.findAll({
            include:[
                {
                    model:Member,
                    as: 'member'
                },{
                    model:Relation,
                    attributes:['id','name']
                }

            ]
        }).then((data:any)=>{
            res.send({
                status: 1,
                family: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public CreateMember(req: Request, res: Response, next: NextFunction) {
         Family.create({
            memberId:req.body.memberId,
            headId:req.body.headId,
            relationId:req.body.relationId
        }).then((data:any)=>{
            res.send({
                status: 1,
                member: data,
                message:'Data Save Sussfully'

            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public generateFamilyNo(req: Request, res: Response, next: NextFunction) {
        Family.findAndCountAll({
            attributes:[
                [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country']
            ]
        })
    }


}


export default FamilyController.getInstance();