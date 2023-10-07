const {User, Order} = require('../models/user')
const config = process.env;
const jwt = require('jsonwebtoken')

class Auth{
    
   // Middleware yaratish\
authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware yaratish: Faqatgina "admin" xususiyati tekshiriladi
async  isAdmin(req, res, next) {
    const user = req.user;
    if (!user || !user.admin) return res.sendStatus(403);
    next();
    }
async isAdminOrManager(req, res, next) {
        const user = req.user;
        if (!user || (!user.admin && !user.manager)) return res.sendStatus(403);
        next();
}
    // async isCurrentManager(req,res,next){
    //     let order = await Order.findOne({trackId:req.params['trackId']})
    //     if(!order)
    //         return res.status(404).send('Такого заказа не существует')
    //     if(!order.points[order.status].place==req.user.address)
    //         return res.status(404).send('Заказ находится не у вас')
    // }
    // async isAdmin(req,res,next){
    //     if(req.user.admin){
    //         next()
    //     }else{return res.status(404).send('Вы не админ')}
    // }
    // async isAdminOrManager(req,res,next){
    //     if(req.user.admin || req.user.manager){
    //         next()
    //     }else{return res.status(404).send('Вы не админ и не менеджер')}
    // }
   
}
module.exports = new Auth()