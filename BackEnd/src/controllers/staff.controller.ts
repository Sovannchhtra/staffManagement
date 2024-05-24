import { Request,Response } from 'express';
import { staff } from '../entity/staff.entity';

// get all staffs
export const getStaff=async(req:Request,res:Response)=>{
     try {
          const staffs = await staff.find();
          if(staffs) {
               return res.status(200).json({success:true,staffs});
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({success:false});
     }
}

// create staff
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
               return res.status(201).json({success:false})
          }
          
     } catch (error) {
          console.log(error);
          return res.status(500).json({success:false});
     }
}

// edit staff
export const editStaff=async(req:Request,res:Response)=>{
     try {
          const staffs = await staff.findOne({where:{staffID:req.params.id}});
          if(staffs) {
               return res.status(200).json({success:true,staffs});
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({success:false});
     }
}

// edit staff submit
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
               return res.status(200).json({success:true});
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({success:false});
     }
}

// delete staff
export const deleteStaff=async(req:Request,res:Response)=>{
     try {
          const id:any = req.params.id;
          const staffs:any = await staff.findOne({where:{staffID:id}});
          const remove = await staff.remove(staffs);
          if(remove) {
               return res.status(200).json({success:true});
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({success:false});
     }
}


// search staff
export const searchStaff=async(req:Request,res:Response)=>{
     try {
          const {staffId,gender,fromBirthday,toBirthday} = req.body;
          let staffs = await staff.find();
          if (staffId) staffs = staffs.filter(staff => staff.staffID == staffId);
          if (gender) staffs = staffs.filter(staff => staff.gender == gender);
          if (fromBirthday) staffs = staffs.filter(staff => new Date(staff.birthDay) >= new Date(fromBirthday));
          if (toBirthday) staffs = staffs.filter(staff => new Date(staff.birthDay) <= new Date(toBirthday));
          return res.status(200).json({staffs});
     } catch (error) {
          console.log(error);
          return res.status(500).json({
               success:false,
          });
     }
}