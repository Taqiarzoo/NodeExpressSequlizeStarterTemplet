const fs = require('fs');
const path = require('path');

import { Op } from 'sequelize';
import {Sequelize} from 'sequelize-typescript';
import AddressType from './address_type.model';
import Area from './area.model';
import City from './city.model';
import Country from './country.model';
import MemberType from './member_type.model';
import Relation from './relation.model';
import State from './state.model';








/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {
    
    public sequelize: Sequelize;
    
    constructor( config: any) {
        console.log(config)
        this.sequelize = new Sequelize(config);
    }

    public initModels() {
        console.log("done Database MOdel")
        this.sequelize.addModels(this.getModels());
        return this.sequelize
        .sync
        (
            {
                force: false,
                alter:true,
            }
        ).then((data:any)=>{
            Relation.findAndCountAll().then(({count})=>{
                if(count==0){
                    Relation.bulkCreate(
                        [
                            {
                                name:"father"
                            },{
                                name:"mother"
                            },{
                                name:"son"
                            },{
                                name:"daughter"
                            },{
                                name:"husband"
                            },{
                                name:"wife"
                            },{
                                name:"brother"
                            },{
                                name:"sister"
                            },{
                                name:"grandfather"
                            },{
                                name:"granddaughter"
                            },{
                                name:"uncle"
                            },{
                                name:"aunt"
                            },{
                                name:"nephew"
                            },{
                                name:"niece"
                            },{
                                name:"cousin"
                            },{
                                name:"cousin"
                            }                         
                        ]
                    )
                }
            })
            Country.findAndCountAll().then(({count})=>{
                if(count==0){
                    Country.bulkCreate([
                        {name: 'India',phonecode:+91},
                        {name: 'USA',phonecode:+101},
                        {name: 'UK',phonecode:+81},
                        {name: 'Japan',phonecode:+96},
                        
                    ])
                }
            })
            State.findAndCountAll().then(({count})=>{
                if(count==0){
                    State.bulkCreate([
                       
                            {
                            key: "AN",
                            name: "Andaman and Nicobar Islands",
                            countryId:1},
                            {
                            key: "AP",
                            name: "Andhra Pradesh"
                            ,countryId:1},
                            {
                            key: "AR",
                            name: "Arunachal Pradesh"
                            ,countryId:1},
                            {
                            key: "AS",
                            name: "Assam"
                            ,countryId:1},
                            {
                            key: "BR",
                            name: "Bihar"
                            ,countryId:1},
                            {
                            key: "CG",
                            name: "Chandigarh"
                            ,countryId:1},
                            {
                            key: "CH",
                            name: "Chhattisgarh"
                            ,countryId:1},
                            {
                            key: "DH",
                            name: "Dadra and Nagar Haveli"
                            ,countryId:1},
                            {
                            key: "DD",
                            name: "Daman and Diu"
                            ,countryId:1},
                            {
                            key: "DL",
                            name: "Delhi"
                            ,countryId:1},
                            {
                            key: "GA",
                            name: "Goa"
                            ,countryId:1},
                            {
                            key: "GJ",
                            name: "Gujarat"
                            ,countryId:1},
                            {
                            key: "HR",
                            name: "Haryana"
                            ,countryId:1},
                            {
                            key: "HP",
                            name: "Himachal Pradesh"
                            ,countryId:1},
                            {
                            key: "JK",
                            name: "Jammu and Kashmir"
                            ,countryId:1},
                            {
                            key: "JH",
                            name: "Jharkhand"
                            ,countryId:1},
                            {
                            key: "KA",
                            name: "Karnataka"
                            ,countryId:1},
                            {
                            key: "KL",
                            name: "Kerala"
                            ,countryId:1},
                            {
                            key: "LD",
                            name: "Lakshadweep"
                            ,countryId:1},
                            {
                            key: "MP",
                            name: "Madhya Pradesh"
                            ,countryId:1},
                            {
                            key: "MH",
                            name: "Maharashtra"
                            ,countryId:1},
                            {
                            key: "MN",
                            name: "Manipur"
                            ,countryId:1},
                            {
                            key: "ML",
                            name: "Meghalaya"
                            ,countryId:1},
                            {
                            key: "MZ",
                            name: "Mizoram"
                            ,countryId:1},
                            {
                            key: "NL",
                            name: "Nagaland"
                            ,countryId:1},
                            {
                            key: "OR",
                            name: "Odisha"
                            ,countryId:1},
                            {
                            key: "PY",
                            name: "Puducherry"
                            ,countryId:1},
                            {
                            key: "PB",
                            name: "Punjab"
                            ,countryId:1},
                            {
                            key: "RJ",
                            name: "Rajasthan"
                            ,countryId:1},
                            {
                            key: "SK",
                            name: "Sikkim"
                            ,countryId:1},
                            {
                            key: "TN",
                            name: "Tamil Nadu"
                            ,countryId:1},
                            {
                            key: "TS",
                            name: "Telangana"
                            ,countryId:1},
                            {
                            key: "TR",
                            name: "Tripura"
                            ,countryId:1},
                            {
                            key: "UK",
                            name: "Uttar Pradesh"
                            ,countryId:1},
                            {
                            key: "UP",
                            name: "Uttarakhand"
                            ,countryId:1},
                            {
                            key: "WB",
                            name: "West Bengal",
                            countryId:1
                            },
                            {
                                key:"NY",
                                name:"New York",
                                countryId:2
                            },
                            {
                                key:"OH",
                                name:"Ohio",
                                countryId:2
                            }
                            ,
                            {
                                key:"OH",
                                name:"Oregon",
                                countryId:2
                            }
                            ,
                            {
                                key:"JC",
                                name:"Japan Capital",
                                countryId:3
                            }
                    ])
                }
            })
            MemberType.findAndCountAll().then(({count})=>{
                if(count==0){
                    MemberType.bulkCreate([
                        {name: 'Aajeevan'},
                        {name: 'Vishisht'},
                        {name: 'Prathisthan'},
                        {name: 'Sadharan'},
                    ])
                }         
            })
            AddressType.findAndCountAll().then(({count})=>{
                if(count==0){
                    AddressType.bulkCreate([
                        {type: 'Residential'},
                        {type:'Non-Residential'},
                        {type:'Company'}
                    ])
                }
            })
            City.findAndCountAll().then(({count})=>{
                if(count==0){
                    City.bulkCreate([
                        {name: 'Jaipur',countryId:1,stateId:29},
                        {name:'Ajmir',countryId:1,stateId:29},
                        {name:'Kota',countryId:1,stateId:29}
                    ])
                }
            })
            Area.findAndCountAll().then(({count})=>{
                if(count==0){
                    Area.bulkCreate([
                        {name: 'Vaishali Nagar',countryId:1,stateId:29,cityId:1},
                        {name:'Mahaveer Nagar',countryId:1,stateId:29,cityId:1},
                        {name:'Jagatpura',countryId:1,stateId:29,cityId:1},
                        {name:'Sirsi Road',countryId:1,stateId:29,cityId:1},
                        {name:'Ajmer Road',countryId:1,stateId:29,cityId:1},
                        {name:'LalKothi',countryId:1,stateId:29,cityId:1},
                        {name:'Bapu Nagar',countryId:1,stateId:29,cityId:1},
                        {name:'Tilak Nagar',countryId:1,stateId:29,cityId:1},
                        {name:'Malviya Nagar',countryId:1,stateId:29,cityId:1},
                    ])
                }
            })
            
        }).catch((err:any)=>{
            console.log(err)
            return
        });
    }
    private getModels() {
       const models:any[]=[]
        fs.readdirSync(__dirname)
            .forEach((file:any) => {
            if (file !== path.basename(__filename) && file.endsWith('model.js')) {
            
                let schemaPath= path.join(__dirname, '/', file.replace(/\.js$/, ''))
                let model=require(schemaPath);
                models.push(model.default)
            }
            });
            console.log(models)
                return models
            }

}

