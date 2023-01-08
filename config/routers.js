const express = require('express');
const multer = require('multer');
const path = require('path');
const connection = require('../config/databases');

const routers = express.Router();

//Methods For Post Data
//First Way
routers.post('/create', (req, res, next) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var usersDetail = req.body;
    const sql = "INSERT INTO users(Name, Email, Password) VALUES(?, ?, ?)";
    connection.query(sql, [usersDetail.Name, usersDetail.Email, usersDetail.Password],(err,result) => {
        if(!err){
            res.write("interested....");
            res.end();
        }else{
            res.json({message: "Error"})
        }
    });
});

//Second Way
// routers.post('/create', (req, res, next) => {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     var usersDetail = req.body;
//     let data = {Name: usersDetail.Name, Email: usersDetail.Email, Password: usersDetail.Password};
//     const sql = "INSERT INTO `users` SET ?";
//     connection.query(sql, data,(err,result, fields) => {
//         if(!err){
//             res.write("interested....");
//             res.end();
//         }else{
//             res.json({message: "Error"})
//         }
//     });
// });




//Method For Get Data From MySql Database And Convert To Restful API
routers.get("/get", (req, res, next) => {
    var sql = "SELECT * FROM users";
    connection.query(sql, (err, result) => {
        if(!err){
            //Show In JSON Array
            return res.json(result);

            //Show In JSON Object
            // return res.json(result[0]);
        }else{
            return res.json(err);
        }
    })
});

//Method For Get Data From MySql Database And Convert To Restful API
routers.post("/login", (req, res, next) => {
    var id = req.body.Id;
    var email = req.body.Email;
    var password = req.body.Password;
    var sql = "SELECT * FROM users WHERE Email = ?";
    connection.query(sql, [email], (err, results, fields) => {
        if(!err){
            res.send(`${results[0].Id}`);
        }else{
            return res.json(err);
        }
    })
});

//Method For Update Data Into MySql Database By JSON
routers.patch("/update/:Id", (req, res, next) => {
    const id = req.params.Id;
    const usersDetail = req.body;
    const sql = "UPDATE users SET Name=?, Email=? WHERE Id=?";
    connection.query(sql, [usersDetail.Name, usersDetail.Email, id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.send("User Id Does'nt Found");
            }
            return res.json(message = "User Update Completed");
        }else{
            return res.json(err);
        }
    })
});


//Method For Delete Data Into MySql Database By JSON
routers.delete("/delete/:Id", (req, res, next) => {
    const id = req.params.Id;
    const usersDetail = req.body;
    const sql = "DELETE FROM users WHERE Id=?";
    connection.query(sql, [id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.send("User Id Does'nt Found");
            }
            return res.json(message = "User Delete Completed");
        }else{
            return res.json(err);
        }
    })
});





//Codes For Upload photos to server From NodeJs
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Images');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
});

routers.post('/post_photo', upload.single('Image'), (req, res) => {
    console.log(req.file.filename);
    var usersDetail = req.body;
    var imageSrc = "http://localhost:5000/Images/" + req.file.filename;
    const sql = "INSERT INTO users(Name, Email, Password, Image) VALUES(?, ?, ?, ?)";
    connection.query(sql, [usersDetail.Name, usersDetail.Email, usersDetail.Password, imageSrc],(err,result) => {
        if(!err){
            res.write("interested....");
            res.end();
        }else{
            res.json({message: "Error"})
        }
    });
});



module.exports = routers;