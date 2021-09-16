import { NextFunction, Request, Response } from "express";
import sequelize from "sequelize";
import { where } from "sequelize";
import { Op, Sequelize } from "sequelize";
import model from "sequelize/types/lib/model";
import Address from "../models/address.model";
import Area from "../models/area.model";
import City from "../models/city.model";
import Contact from "../models/contact.model";
import Family from "../models/family.model";
import GaliMohalla from "../models/gali_mohalla.model";
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
        let opAnd=[];
        if(req.query?.is_head_assign=='true'){
            opAnd.push({
                is_head_assign:true
            })
        }else if(req.query?.is_head_assign=='false'){
            opAnd.push({
                is_head_assign:false
            })
        }
        if(req.query?.is_relation_define=='true'){
            opAnd.push({
                is_relation_define:true
            })
        }else if(req.query?.is_relation_define=='false'){
            opAnd.push({
                is_relation_define:false
            })
        }
        await Family.findAll({
            attributes: [ 
                [Sequelize.fn('COUNT', Sequelize.col('tempHeadId')) ,'No_of_members'],
                'family_name',
                'family_no'
            
            ],
            
                 
                include:[
                {
                    model:Member,
                    as: 'head',
                    attributes:['first_name','middle_name','last_name'],
                    include:[
                        {
                            model:Contact,
                            attributes:['number'],
                            
                        },
                        {
                            
                            model: Address,
                            attributes:['countryId','stateId','areaId'],
                            include:[
                                {
                                    model:Area,
                                    attributes:['id','name'],   
                                    include:[
                                        {
                                            model:GaliMohalla,
                                            attributes:['id','name']
                                        },
                                    ] 
                                },
                                {
                                    model:City,
                                    attributes:['id','name']
                                }

                            ],
                        }
                    ]
                 }
            ], 
            group: ['tempHeadId'],
            raw:true,
            where:{
                [Op.and]:opAnd
            }
          
        }).then((data:any)=>{
            res.send({
                status: 1,
                data: data
            })
        }).catch((err:any)=>{
            console.log(err)
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
            area
            
        }=req.body
        let family_name;
        console.log(req.body)
        try{
          
            Family.findAndCountAll({
                include:[
                    {
                        model:Member,
                        as:'head',
                        include:[
                            {
                                model:Address,
                                attributes:['id'],
                                where:{
                                    areaId:area.areaId
                                }
                            }
                        ],
                        where:{
                            last_name:head.last_name,
                            is_head:1
                        }
                        
                    }
                ]
            }).then(({rows,count})=>{
                console.log(rows)
                console.log("Count")
                console.log(count)
                family_name=area.area+"/"+head.last_name
                if(count){
                    family_name=area.area+"/"+head.last_name+"-"+count
                }
                console.log(family_name)
            
            for (let index = 0; index < family.length; index++) {
                const element = family[index];
                Family.update({
                    headId:head.id,
                    family_name:family_name,
                },{
                    where:{
                        memberId:element.id
                    }
                }).then((data:any)=>{
                    Family.update({
                        is_head_assign:1
                    },{
                        where:{
                            memberId:element.id
                        }
                    })
                })
            }
            console.log(family_name)
            res.send({
                status: 1,
                family_name:family_name,
                message:'Data Save Sussfully'
            })
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

    public setRelations(req: Request, res: Response, next: NextFunction) {
        let {
            family,
            head,
            family_name,
        }=req.body
        console.log(req.body)
        try{
            for (let index = 0; index < family.length; index++) {
                const element = family[index];
                if(element.memberId!=head.id)
                    Family.update({
                        relationId:element.relationId,
                        is_relation_define:1
                    },{
                        where:{
                            memberId:element.memberId
                        }
                    }).then((data:any)=>{
                        
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