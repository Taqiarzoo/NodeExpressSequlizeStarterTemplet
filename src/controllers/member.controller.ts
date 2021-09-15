import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import Address from "../models/address.model";
import Area from "../models/area.model";
import City from "../models/city.model";
import Contact from "../models/contact.model";
import Country from "../models/country.model";
import GaliMohalla from "../models/gali_mohalla.model";
import LastNames from "../models/last_names.model";
import Member from "../models/member.model";
import MemberType from "../models/member_type.model";
import State from "../models/state.model";



class MemberController {
  public static selfInstance: MemberController = null;

  public static getInstance() {
    if (MemberController.selfInstance) {
      return MemberController.selfInstance;
    }
    this.selfInstance = new MemberController();
    return this.selfInstance;
  }

    public async getMembers(req: Request, res: Response, next: NextFunction) {
        let opAnd=[];
        let opLike=[];
        console.log(req.query)

        if(req.query?.is_assign_family=='true'){
            opAnd.push({
                is_assign_family:true
            })
        }else if(req.query?.is_assign_family=='false'){
            opAnd.push({
                is_assign_family:false
            })
        }
        if(req.query?.areaId){
            opAnd.push({
                areaId:req.query.areaId
            })
        }
        if(req.query?.galimohallaId){
            opAnd.push({
                galimohallaId:req.query.galimohallaId
            })
        }
        if(req.query?.last_name){
            opAnd.push({
                last_name:{
                    [Op.like]:req.query.last_name
                }
            })
        }
        console.log("Operator")
        console.log(opAnd)
        await Member.findAll({
            include: [
                {model: MemberType},
                {model: Contact},
                {model: MemberType},
                {
                    model: Address,
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
                            model:Country,
                            attributes:['id','name']
                        },{
                            model:State,
                            attributes:['id','name']
                        },{
                            model:City,
                            attributes:['id','name']
                        }
                    ]
                },
            ],
            where:{
                [Op.and]:opAnd
            }
            //TODO limit the respons data based on pagination value
        }).then((data:any)=>{
            res.send({
                status: 1,
                member: data
            })
        }).catch((err:any)=>{
            console.log(err)
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async getMember(req: Request, res: Response, next: NextFunction) {
        await Member.findAll({
            where:{
                id:req.body.memberId
            },
            include: [
                {model: MemberType},
                {model: Contact},
                {model: MemberType},
                {
                    model: Address,
                    include:[
                        {
                            model:Area,
                            attributes:['id','name']
                        },
                        {
                            model:GaliMohalla,
                            attributes:['id','name']
                        },{
                            model:Country,
                            attributes:['id','name']
                        },{
                            model:State,
                            attributes:['id','name']
                        },{
                            model:City,
                            attributes:['id','name']
                        }
                    ]
                },
            ]
            //TODO limit the respons data based on pagination value
        }).then((data:any)=>{
            res.send({
                status: 1,
                member: data
            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async CreateMember(req: Request, res: Response, next: NextFunction) {
        let {
            member,
            member_no,
            first_name,
            middle_name,
            last_name,
            dob,
            age,
            relative,
            email,
            website,
            gender,
            category,
            details,
            date_of_joining,
            married_status,
            date_of_married,
            fee_paid_upto,
            memberTypeId,
            contacts,
            addresses
        }=req.body;

        await Member.create({
            member:member,
            member_no:member_no,
            first_name:first_name,
            middle_name:middle_name,
            last_name:last_name,
            dob:dob,
            age:age,
            relative:relative,
            email:email,
            website: website,
            gender:gender,
            category:category,
            details:details,
            date_of_joining:date_of_joining,
            married_status:married_status,
            date_of_married: date_of_married,
            fee_paid_upto:fee_paid_upto,
            memberTypeId:memberTypeId,
        }).then((data:any)=>{
            if(contacts){
                for (let index = 0; index < contacts.length; index++) {
                    const element = contacts[index];
                    Contact.create({
                        number:element.number,
                        memberId:data.id,
                    })
                }
            }
            if(addresses){
                for (let index = 0; index < addresses.length; index++) {
                    const address = addresses[index];
                    if(address.area){
                        console.log(req.body)
                        console.log(req.body.addresses[index].gali_mohalla[0])
                        console.log(req.body.addresses[index].area[0])
                        Area.findOrCreate({
                            where:{
                                name:address.area[0].name,
                                cityId:address.city
                            }
                        }).then(([area,created]) => {
                            try{
                                console.log("Area Create")
                                console.log(area)
                                if(created){
                                    area.name=address.area[0].name,
                                    area.countryId=address.country.countryId,
                                    area.stateId=address.state.stateId,
                                    area.cityId=address.city.cityId
                                     area.save().then(data=>{
                                    address.area[0].id=data.id;
                                   })
                                }
                                GaliMohalla.findOrCreate({
                                    where:{
                                        name:address.gali_mohalla[0].name,
                                        areaId:address.area[0].id
                                    }
                                }).then(([gm,created])=>{
                                    console.log("GM Create")
                                    console.log(gm)
                                    if(created){
                                        gm.name=address.gali_mohalla[0].name,
                                        gm.areaId=address.area[0].id
                                        gm.save().then(data=>{
                                            address.gali_mohalla[0].id=data.id
                                        })
                                    }
                                })
                                
                                LastNames.count({
                                    where:{
                                        name:req.body.last_name,
                                        galiMohallaId:address.gali_mohalla[0]? address.gali_mohalla[0].id:null
                                    }
                                }).then((count:number)=>{
                                    if(count==0){
                                        LastNames.create({
                                            name:req.body.last_name,
                                            galiMohallaId: address.gali_mohalla[0].id
                                        }).then(data=>{
                                            console.log("last_name Created")
                                            console.log(data)
                                        })
                                    }
                                })

                                Address.create({
                                    house_no:address.house_no,
                                    areaId:address.area[0].id,
                                    landmark:address.landmark,
                                    addressTypeId:1,
                                    pincode:address.pincode,
                                    countryId:address.country,
                                    stateId:address.state,
                                    cityId:address.city,
                                    memberId:data.id,
                                }).then(data=>{
                                    console.log("Address Create")
                                     console.log(data)
                                })
                            }catch(err){
                                console.log(err)
                            }
                        }) 
                    }
                    
                }
            }
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


    public async UpdateMember(req: Request, res: Response, next: NextFunction) {
        let {
            member,
            member_no,
            first_name,
            middle_name,
            last_name,
            dob,
            age,
            relative,
            email,
            website,
            gender,
            category,
            details,
            date_of_joining,
            married_status,
            date_of_married,
            fee_paid_upto,
            memberTypeId,
            contacts,
            addresses
        }=req.body;

        await Member.update({
            member:member,
            member_no:member_no,
            first_name:first_name,
            middle_name:middle_name,
            last_name:last_name,
            dob:dob,
            age:age,
            relative:relative,
            email:email,
            website: website,
            gender:gender,
            category:category,
            details:details,
            date_of_joining:date_of_joining,
            married_status:married_status,
            date_of_married: date_of_married,
            fee_paid_upto:fee_paid_upto,
            memberTypeId:memberTypeId,
        },{
            where:{
                id:req.body.id
            }
        }).then((data:any)=>{
            if(contacts){
                Contact.destroy({
                    where:{
                        memberId:data.id,
                    }
                }).then(()=>{
                    for (let index = 0; index < contacts.length; index++) {
                        const element = contacts[index];
                        Contact.create({
                            number:element.number,
                            memberId:data.id,
                        })
                    }
                })
            }
            if(addresses){
                Address.destroy({
                    where:{
                        memberId:data.id,
                    }
                }).then(()=>{
                    for (let index = 0; index < addresses.length; index++) {
                        const address = addresses[index];
                        if(address.area){
                            Area.findOrCreate({
                                where:{
                                    id:address.area.id?address.area.id:-5
                                }
                            }).then(([area,created]) => {
                                if(created){
                                    area.name=address.area.name,
                                    area.countryId=address.country.countryId,
                                    area.stateId=address.state.stateId,
                                    area.cityId=address.city.cityId
                                    area.save().then((data:any)=>{
                                        address.area.id=data.id;
                                    })
                                  
                                }
                                Address.create({
                                    house_no:address.house_no,
                                    galimohallaId:address.galimohallaId,
                                    areaId:address.area.id,
                                    landmark:address.landmark,
                                    pincode:address.pincode,
                                    countryId:address.country.countryId,
                                    stateId:address.state.stateId,
                                    cityId:address.city.cityId,
                                    memberId:data.id,
                                })
                            }) 
                        }
                        
                    }
                })
                
            }
            res.send({
                status: 1,
                member: data,
                message:'Data Updated Sussfully'

            })
        }).catch((err:any)=>{
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }


    public async deleteMember(req: Request, res: Response, next: NextFunction) {
        try {
            Member.destroy({
                where:{
                    id:req.body.id
                }
            }).then(id=>{
                Address.destroy({
                    where:{
                        memberId:id
                    }
                })
            })
        } catch (e) {
          res.send({
            status:-1,
            error_message:'Unable to Delete'
          })
        }
      }
}

export default MemberController.getInstance()


