var express = require('express');
var userRouter = express.Router();
const jwt = require('jsonwebtoken')
const trekCodeControllers = require("../Controller/trekCodeControllers.js");

userRouter.get("/users",trekCodeControllers.getAll);
userRouter.delete("/users/:id",trekCodeControllers.deleteUser);
userRouter.put("/users/:id",trekCodeControllers.updateUser);
userRouter.post("/register",trekCodeControllers.createUser);
userRouter.post("/login",trekCodeControllers.loginUser);



module.exports = userRouter;