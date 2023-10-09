var express = require('express');
var userRouter = express.Router();
const jwt = require('jsonwebtoken')
const userController = require("../Controller/userController.js");
const auth = require('../middleware/auth.js');

userRouter.get("/users" ,auth.authenticateToken, userController.getAll);
userRouter.delete("/users/:id",auth.authenticateToken,userController.deleteUser);
userRouter.put("/users/:id",auth.authenticateToken,userController.updateUser);
userRouter.post("/register",auth.authenticateToken,userController.createUser);
userRouter.post("/login",auth.authenticateToken,userController.loginUser);



module.exports = userRouter;