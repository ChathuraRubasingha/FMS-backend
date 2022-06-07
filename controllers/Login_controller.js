const pool = require("../db");
const express = require('express'),
router = express.Router()

const UserLogin = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username + password);

    pool.query('SELECT * FROM ma_user WHERE UserName = ? AND Password = ?',
    [username, password],
    (err, result) => {
        if(err) {
            res.send({err:err});
        }
        if(result.length) {

            res.send(result);
        }else{
            res.send({message:"Wrong username/password combination"});
        }
    }
    );
}

exports.UserLogin = UserLogin