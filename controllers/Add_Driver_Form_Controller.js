const pool = require("../db");
const express = require('express'),
router = express.Router()

const GetLocation=(req, res)=>{
    pool.query('SELECT Location_ID, Location_Name FROM ma_location',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })

}

exports.GetLocation=GetLocation