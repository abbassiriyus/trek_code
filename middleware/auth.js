require("dotenv").config()
const jwt = require('jsonwebtoken')

class Auth{
   // Middleware yaratish\
authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (token == null) return res.sendStatus(401);
console.log(token.slice(8),process.env.JWT_KEY);
    jwt.verify(token.slice(8), process.env.JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
});
}

// Middleware yaratish: Faqatgina "admin" xususiyati tekshiriladi
async  isAdmin(req, res, next) {
    const user = req.user;
    console.log(user);
    if (!user || !user.admin) return res.sendStatus(403);
    next();
    }
async isAdminOrManager(req, res, next) {
        const user = req.user;
        if (!user || (!user.admin && !user.manager)) return res.sendStatus(403);
        next();
}  
}
module.exports = new Auth()