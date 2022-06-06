const pool = require("../db");
const express = require('express'),
router = express.Router()


const GetVehicles=(req, res)=>{
    pool.query('SELECT Driver_ID, Full_Name, NIC, Mobile FROM ma_driver',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })

}

exports.GetVehicles = GetVehicles;