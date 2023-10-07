var express = require('express');
var trekCodeRouter = express.Router();
const jwt = require('jsonwebtoken')
const userController = require("../Controller/userController.js");

trekCodeRouter.get("/trek",userController.getAll);
trekCodeRouter.delete("/trek/:id",userController.deleteUser);
trekCodeRouter.put("/trek/:id",userController.updateUser);
trekCodeRouter.post("/trek")



module.exports = trekCodeRouter;