const pool = require("../db");
const express = require('express'),
router = express.Router()

const Adddriver = (req, res) => {
    console.log(req.body)
    const callingName = req.body.callingName
    const fullName = req.body.fullName
    const location = req.body.location
    const nic = req.body.nic
    const status = req.body.status
    const mobile = req.body.mobile
    const address = req.body.address
    const image = req.body.image

    pool.query('INSERT INTO ma_driver (Full_Name, Complete_Name, Location_ID, NIC, Status, Mobile, Private_Address, Driver_Image) VALUES(?,?,?,?,?,?,?,?)',
     [callingName, fullName, location, nic, status, mobile, address, image],
     (err, result) => {
         if(err){
             console.log(err)
         } else{
             res.send("Success");
         }
     }
    );
}

// get data from database
const GetDrivers=(req, res)=>{
        pool.query('SELECT Driver_ID, Full_Name, NIC, Mobile, Private_Address FROM ma_driver',(err, rows)=>{
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    }

//delete data
const DeleteById= (req, res) =>{
    const id = req.params.id
    console.log(id)
    pool.query('DELETE FROM ma_driver WHERE Driver_ID = ?', id, (err, result) => {
        if(err) {
            console.log(err)
        }else{
            res.send(result);
        }
    })
}

const GetDriver = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM ma_driver WHERE Driver_ID = ?', id, (err, result) => {
        if(err) {
            res.status(400).send(err)
        }else{
            res.send(result[0]);
        }
    })
}

const UpdateDriver = (req, res) => {
    const id = req.params.id;
    const {
        callingName,
        fullName,
        location,
        nic,
        status,
        mobile,
        address,
        image,
    } = req.body;
    console.log(fullName, callingName)

    pool.query('UPDATE ma_driver SET Full_Name = ?, Complete_Name = ?, Location_ID = ?, NIC = ?, Status = ?, Mobile = ?, Private_Address = ?, Driver_Image = ? WHERE Driver_ID = ?',
    [callingName, fullName, location, nic, status, mobile, address, image, id],
    (err, result) => {
        if(err) {
            res.status(400).send(err)
        }else{
            res.send({
                msg: 'User updated successfully'
            });
        }
    })
}

exports.Adddriver=Adddriver
exports.DeleteById=DeleteById
exports.GetDrivers=GetDrivers
exports.GetDriver = GetDriver;
exports.UpdateDriver = UpdateDriver
