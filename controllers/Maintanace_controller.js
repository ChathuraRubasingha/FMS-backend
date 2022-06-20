const pool = require("../db");
const express = require("express"),
  router = express.Router();

const GetVehicles=(req, res)=>{
    pool.query('SELECT ma_vehicle_registry.Vehicle_No,ma_vehicle_category.Category_Name,ma_location.Location_Name,ma_make.Make,ma_fuel_type.Fuel_Type,ma_tyre_size.Tyre_Size FROM ma_vehicle_category INNER JOIN ma_vehicle_registry ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN ma_fuel_type ON ma_vehicle_registry.Fuel_Type_ID = ma_fuel_type.Fuel_Type_ID INNER JOIN ma_location ON ma_vehicle_registry.Location_ID = ma_location.Location_ID INNER JOIN ma_tyre_size ON ma_vehicle_registry.Tyre_Size_ID = ma_tyre_size.Tyre_Size_ID INNER JOIN ma_make ON ma_vehicle_registry.Make_ID = ma_make.Make_ID',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })

}

const VehicleDetails = (req, res) => {
    const vehicleNO = req.params.id;
    console.log(vehicleNO)
    pool.query('SELECT ma_vehicle_registry.Vehicle_No,ma_allocation_type.Allocation_Type,ma_vehicle_category.Category_Name,ma_make.Make,ma_model.Model,ma_vehicle_registry.Make_Year,ma_vehicle_registry.Purchase_Value,ma_vehicle_registry.Purchase_Date,ma_vehicle_registry.Engine_No,ma_vehicle_registry.Chassis_No,ma_vehicle_registry.No_of_Tyres,ma_vehicle_registry.Number_of_Passenger,ma_vehicle_registry.odometer,ma_vehicle_registry.Ac_Statues,ma_tyre_type.Tyre_Type,ma_fuel_type.Fuel_Type,ma_vehicle_registry.Fuel_Tank_Capacity FROM ma_vehicle_registry LEFT JOIN ma_allocation_type ON ma_allocation_type.Allocation_Type_ID = ma_vehicle_registry.Allocation_Type_ID LEFT JOIN ma_vehicle_category ON ma_vehicle_category.Vehicle_Category_ID = ma_vehicle_registry.Vehicle_Category_ID LEFT JOIN ma_make ON ma_make.Make_ID = ma_vehicle_registry.Make_ID LEFT JOIN ma_model ON ma_model.Model_ID = ma_vehicle_registry.Model_ID LEFT JOIN ma_tyre_type ON ma_tyre_type.Tyre_Type_ID = ma_vehicle_registry.Tyre_Size_ID LEFT JOIN ma_fuel_type ON ma_fuel_type.Fuel_Type_ID = ma_vehicle_registry.Fuel_Type_ID WHERE ma_vehicle_registry.Vehicle_No = ?', vehicleNO, (err, result) => {
        if(err) {
            res.status(400).send(err)
        }else{
            res.send(result[0]);
        }
    })
}

const AddService = (req, res) => {
    console.log(req.body);
    const driver = req.body.driver;
    const serviceStation = req.body.serviceStation;
    const serviceType = req.body.serviceType;
    const serviceDate = req.body.serviceDate;
    const vehicleNO = req.body.vehicleNO;

    console.log(driver + serviceStation + serviceType + serviceDate)
  
    pool.query(
      "INSERT INTO services (Vehicle_No, Driver_ID, Service_Station_ID, Service_Type_ID, Service_Date) VALUES(?,?,?,?,?)",
      [vehicleNO, driver, serviceStation, serviceType, serviceDate],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Success");
        }
      }
    );
  };

  const GetServiceStation=(req, res)=>{
    pool.query('SELECT Service_Station_ID, Srvice_Station_Name FROM ma_service_station',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
}

const GetServiceType=(req, res)=>{
    pool.query('SELECT Service_Type_ID, Service_Type FROM ma_service_type',(err, rows)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
}

const GetServiceDetails = (req, res) => {
    const vehicleNO = req.params.id;
    console.log(vehicleNO)
    pool.query('SELECT services.Services_ID, services.Vehicle_No, ma_service_station.Srvice_Station_Name, ma_service_type.Service_Type, services.Service_Date FROM services LEFT JOIN ma_service_station ON ma_service_station.Service_Station_ID = services.Service_Station_ID LEFT JOIN ma_service_type ON ma_service_type.Service_Type_ID = services.Service_Type_ID WHERE services.Vehicle_No = ?', vehicleNO, (err, result) => {
        if(err) {
            res.status(400).send(err)
        }else{
            res.send(result[0]);
        }
    })
}


exports.GetVehicles = GetVehicles;
exports.AddService = AddService
exports.VehicleDetails = VehicleDetails
exports.GetServiceStation = GetServiceStation//SELECT services.Services_ID, services.Vehicle_No, ma_service_station.Srvice_Station_Name, ma_service_type.Service_Type, services.Service_Date FROM services LEFT JOIN ma_service_station ON ma_service_station.Service_Station_ID = services.Service_Station_ID LEFT JOIN ma_service_type ON ma_service_type.Service_Type_ID = services.Service_Type_ID WHERE services.Vehicle_No = 'PX-7053'
exports.GetServiceType = GetServiceType
exports.GetServiceDetails = GetServiceDetails
