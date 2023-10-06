var express = require('express');
var userRouter = express.Router();
// const pool = require("../db")
// const mw = require('../middleware/auth.js')
// const fs =require("fs")
const jwt = require('jsonwebtoken')
const userController = require("../Controller/userController.js");

userRouter.get("/users",userController.getAll);
userRouter.delete("/users/:id",userController.deleteUser);
userRouter.put("/users/:id",userController.updateUser);
userRouter.post("/register",userController.createUser);
userRouter.post("/login",userController.loginUser);

// router.post('/login', function(req, res) {
//     var body=req.body
//     if(body){
//         var datatime=new Date()
//     pool.query("SELECT * FROM users", (err, result) => {
//         if (!err) {
//           var token
//           var position
//           var a=false
//       result.rows.
//        if(!a){res.status(500).send("Royhatdan o`tmagan") }else{
//         res.status(200).send({"access":token,"position":position}) 
//        }
//         } else {
//             res.status(401).send(err)
//         }
//     })}else{
//         res.status(441).send("post metodida hech qanday data yuborilmadi")
//     }
    
// });


module.exports = userRouter;