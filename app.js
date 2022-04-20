const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Connection = require('mysql/lib/Connection')


const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

//MySql 
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'smsl_fleet_sqm'
})

// get data from database

app.get('', (req, res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        console.log(`Connected as id ${Connection.threadId}`)
        //query

        Connection.query('SELECT ma_vehicle_category.Category_Name, COUNT(ma_vehicle_registry.Vehicle_No) as Total_vehicle, COUNT(accident.Accident_ID)  as Accident_vehicle FROM ma_vehicle_category INNER JOIN ma_vehicle_registry ON ma_vehicle_category.Vehicle_Category_ID = ma_vehicle_registry.Vehicle_Category_ID LEFT JOIN accident ON ma_vehicle_registry.Vehicle_No = accident.Vehicle_No GROUP BY ma_vehicle_category.Vehicle_Category_ID, ma_vehicle_category.Category_Name',(err, rows)=>{
            Connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })
})

//get data by id

app.get('/:Driver_ID', (req, res)=>{
    pool.getConnection((err, Connection)=>{
        if(err) throw err
        console.log(`Connected as id ${Connection.threadId}`)
        //query

        Connection.query('select Complete_Name, NIC, Mobile from ma_driver WHERE Driver_ID = ?',[req.params.Driver_ID], (err, rows)=>{
            Connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })
})


//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`))