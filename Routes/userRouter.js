var express = require('express');
var userRouter = express.Router();
const jwt = require('jsonwebtoken')
const userController = require("../Controller/userController.js");
const auth = require('../middleware/auth.js');

// userRouter.get("/users" ,auth.authenticateToken,auth.isAdmin, userController.getAll);
userRouter.get("/users",auth.authenticateToken, userController.getAll);
userRouter.get("/user",auth.authenticateToken, userController.getone);
userRouter.delete("/users/:id",auth.authenticateToken,auth.isAdmin,userController.deleteUser);
userRouter.put("/users/:id",auth.authenticateToken,userController.updateUser);
userRouter.put("/admin/:id",auth.authenticateToken,auth.isAdmin,userController.updateUser2);
userRouter.post("/register",auth.authenticateToken,userController.createUser);
userRouter.post("/login",userController.loginUser);



module.exports = userRouter;