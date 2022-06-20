const pool = require("../db");
const express = require("express"),
router = express.Router();

const GetRegisterdVehicle=(req, res)=>{
    pool.query('select count(*) as Reg from ma_vehicle_registry',(err, result)=>{
        if(!err){
            res.send(result[0])
        }else{
            console.log(err)
        }
    })
}
const GetAllocatedVehicle=(req, res)=>{
    pool.query('SELECT count(*) Allocated FROM ma_vehicle_registry INNER JOIN ma_allocation_type ON ma_allocation_type.Allocation_Type_ID = ma_vehicle_registry.Allocation_Type_ID where ma_vehicle_registry.Allocation_Type_ID = 1',(err, result)=>{
        if(!err){
            res.send(result[0])
        }else{
            console.log(err)
        }
    })
}
const GetPoolVehicle=(req, res)=>{
    pool.query('SELECT count(*) Pool FROM ma_vehicle_registry INNER JOIN ma_allocation_type ON ma_allocation_type.Allocation_Type_ID = ma_vehicle_registry.Allocation_Type_ID where ma_vehicle_registry.Allocation_Type_ID = 1',(err, result)=>{
        if(!err){
            res.send(result[0])
        }else{
            console.log(err)
        }
    })
}

const GetAccidentVehicle=(req, res)=>{
    pool.query('SELECT Count(ma_vehicle_registry.Vehicle_No) Accident FROM ma_vehicle_registry WHERE ma_vehicle_registry.Vehicle_Status_ID = 2',(err, result)=>{
        if(!err){
            res.send(result[0])
        }else{
            console.log(err)
        }
    })
}
const Registerd=(req, res)=>{
    pool.query('SELECT ma_vehicle_category.Category_Name, Count(ma_vehicle_registry.Vehicle_No) TotReg FROM ma_vehicle_registry INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID GROUP BY ma_vehicle_category.Category_Name',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
}

const Allocated=(req, res)=>{
    pool.query('SELECT ma_vehicle_category.Category_Name,Count(ma_vehicle_registry.Vehicle_No) as count1 FROM ma_vehicle_registry LEFT JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID LEFT JOIN vehicle_transfer ON ma_vehicle_registry.Vehicle_No = vehicle_transfer.Vehicle_No LEFT JOIN ma_vehicle_status ON ma_vehicle_registry.Vehicle_Status_ID = ma_vehicle_status.Vehicle_Status_ID WHERE vehicle_transfer.To_Date < CURDATE() AND ma_vehicle_registry.Vehicle_Status_ID = 1 GROUP BY ma_vehicle_category.Category_Name',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
}

exports.GetAllocatedVehicle=GetAllocatedVehicle
exports.GetRegisterdVehicle=GetRegisterdVehicle
exports.GetPoolVehicle=GetPoolVehicle
exports.GetAccidentVehicle=GetAccidentVehicle
exports.Registerd=Registerd
exports.Allocated=Allocated


//SELECT ma_vehicle_category.Category_Name, Count(ma_vehicle_registry.Vehicle_No) TotReg FROM ma_vehicle_registry INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID GROUP BY ma_vehicle_category.Category_Name