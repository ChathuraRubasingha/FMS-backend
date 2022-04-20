exports.table1 = (req, res) => {
    pool.getConnection((err, Connection) => {
        if (err) throw err
        console.log(`Connected as id ${Connection.threadId}`)
        //query

        Connection.query('SELECT ma_vehicle_category.Category_Name, COUNT(ma_vehicle_registry.Vehicle_No) as Total_vehicle, COUNT(accident.Accident_ID)  as Accident_vehicle FROM ma_vehicle_category INNER JOIN ma_vehicle_registry ON ma_vehicle_category.Vehicle_Category_ID = ma_vehicle_registry.Vehicle_Category_ID LEFT JOIN accident ON ma_vehicle_registry.Vehicle_No = accident.Vehicle_No GROUP BY ma_vehicle_category.Vehicle_Category_ID, ma_vehicle_category.Category_Name', (err, rows) => {
            Connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })
}