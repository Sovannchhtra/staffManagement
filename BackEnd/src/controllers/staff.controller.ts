import { Request,Response } from 'express';
import { staff } from '../entity/staff.entity';

export const getStaff=async(req:Request,res:Response)=>{
     try {
          const staffs = await staff.find();
          if(staffs) {
               return res.status(200).json({
                    success:true,
                    message:'get all staff successfully',
                    staffs
               });
          }
          
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Error get all staff from api controller',
          });
     }
}

export const createStaff=async(req:Request,res:Response)=>{
     try {
          const {name,gender,birthday} = req.body;
          const create = await staff.create({
               ...staff,
               fullName:name,
               gender:gender,
               birthDay:birthday
          })
          const staffSave = await staff.save(create);
          if(staffSave){
               return res.status(201).json({
                    success:false,
                    message:'Create staff from api controller',
               })
          }
          
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Error create all staff from api controller',
          });
     }
}

export const editStaff=async(req:Request,res:Response)=>{
     try {
          const staffs = await staff.findOne({where:{staffID:req.params.id}});
          if(staffs) {
               return res.status(200).json({
                    success:true,
                    message:'Update staff successfully',
                    staffs
               });
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Error edit staff from api controller',
          });
     }
}

export const updateStaff=async(req:Request,res:Response)=>{
     try {
          const id:any = req.params.id;
          const {name,gender,birthday} = req.body;

          const findStaff:any = await staff.findOne({where:{staffID:id}});

          const updateStaff = await findStaff?.save(
               findStaff.fullName = name,
               findStaff.gender = gender,
               findStaff.birthDay = birthday,
          )
          if(updateStaff){
               return res.status(200).json({
                    success:true,
                    message:'Update staff successfully'
               });
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Error edit all staff from api controller',
          });
     }
}

export const deleteStaff=async(req:Request,res:Response)=>{
     try {
          const id:any = req.params.id;
          const staffs:any = await staff.findOne({where:{staffID:id}});
          const remove = await staff.remove(staffs);
          if(remove) {
               return res.status(200).json({
                    success:true,
                    message:'Delete staff successfully',
               });
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Delete staff from api controller',
          });
     }
}

export const searchStaff=async(req:Request,res:Response)=>{
     try {
          const {search} = req.body;
          let staffs = await staff.find();
          if(search){
               if(search === 'Male' || search === 'male'){
                    const genderNumber = 1;
                    if(staffs = await staff.find({where:{gender:genderNumber}})){
                         return res.status(200).json({
                              success:true,
                              staffs
                         });
                    }
               }
               if(search === 'Female' || search === 'female'){
                    const genderNumber = 2;
                    if(staffs = await staff.find({where:{gender:genderNumber}})){
                         return res.status(200).json({
                              success:true,
                              staffs
                         });
                    }
               }

               if(staffs = await staff.find({where:{staffID:search}})){
                    return res.status(200).json({
                         success:true,
                         staffs
                    });
               }
          }
          if(search){
               staffs = staffs.filter(staff => new Date(staff.birthDay) >= new Date(search));
               return res.status(200).json({
                    success:true,
                    staffs
               });
          }
          if(search){
               staffs = staffs.filter(staff => new Date(staff.birthDay) <= new Date(search));
               return res.status(200).json({
                    success:true,
                    staffs
               });
          }
          
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
               message:'Seaech staff from api controller',
          });
     }
}