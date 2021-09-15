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

    public createFamily(req: Request, res: Response, next: NextFunction) {
        let {
            family
        }=req.body
        console.log(req.body)
        try{
            let family_Number;
            Family.findAndCountAll({
                attributes:[
                    [Sequelize.fn('DISTINCT', Sequelize.col('tempHeadId')) ,'tempHeadId']
                ]
            }).then(({count})=>{
                family_Number="S3/"+(count+1).toString().padStart(5, '0')
                for (let index = 0; index < family.length; index++) {
                    const element = family[index];
                    Family.create({
                        memberId:element.id,
                        tempHeadId:family[0].id,
                        family_no:family_Number
                    }).then((data:any)=>{
                        Member.update({
                            is_assign_family:1
                        },{
                            where:{
                                id:element.id
                            }
                        })
                    })
                }
            })
            
            res.send({
                status: 1,
                family_no:family_Number,
                message:'Data Save Sussfully'
            })
        }catch(err){
            console.log(err)
            res.send({
                status: -1,
                error_message: "Error occure",
                error:err
            })
        }
    }

    public selectHead(req: Request, res: Response, next: NextFunction) {
        let {
            family,
            head,
        }=req.body
        console.log(req.body)
        try{
            for (let index = 0; index < family.length; index++) {
                const element = family[index];
                Family.update({
                    headId:head.id,
                },{
                    where:{
                        id:element.id
                    }
                }).then((data:any)=>{
                    Family.update({
                        is_head_assign:1
                    },{
                        where:{
                            id:element.id
                        }
                    })
                })
            }
            res.send({
                status: 1,
                message:'Data Save Sussfully'
            })
        }catch(err){
            console.log(err)
            res.send({
                status: -1,
                error_message: "Error occure",
                error:err
            })
        }
    }

    public generateFamilyNo(req: Request, res: Response, next: NextFunction) {
        Family.findAndCountAll({
            attributes:[
                [Sequelize.fn('DISTINCT', Sequelize.col('tempHeadId')) ,'tempHeadId']
            ]
        }).then(({count})=>{
            let family_Number="S3/"+(count+1).toString().padStart(5, '0')
            res.send({
                status: 1,
                family_Number:family_Number
            })
        }).catch((err)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }


}


export default FamilyController.getInstance();