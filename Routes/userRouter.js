var express = require('express');
var userRouter = express.Router();
const jwt = require('jsonwebtoken')
const userController = require("../Controller/userController.js");

userRouter.get("/users",userController.getAll);
userRouter.delete("/users/:id",userController.deleteUser);
userRouter.put("/users/:id",userController.updateUser);
userRouter.post("/register",userController.createUser);
userRouter.post("/login",userController.loginUser);



module.exports = userRouter;