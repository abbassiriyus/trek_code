
require("dotenv").config()
const pool = require("../db")
const jwt = require('jsonwebtoken')


class Manager{
    async getAll(req,res){
        try{
            pool.query("SELECT * FROM users", (err, result) => {
                if (!err) {
                    res.status(200).send(result.rows)  
                } else {
                    res.status(400).send({err:err,message:'sql not running'})
                } 
            })
        }catch{
            return res.status(404).send('Ошибка')
        }
    }
    async createUser(req,res) {
        let {email, password}=req.body
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];
        try {
            const result = await pool.query(query, values);
            const user = result.rows[0];
            // Create a JWT token for the user
            const token = jwt.sign({ userId: user.id, email: user.email}, process.env.JWT_KEY);
            user.token=token
            return  res.status(200).send(result.rows[0]);
        } catch (error) {
            return res.status(404).send({err:error,message:'Ошибка'})
        }
    }
    async deleteUser(req,res) {
        var {id}=req.params
        if (!id) {
            return res.status(404).send({err:"ID not provided",message:'Ошибка'}) // Error if ID is missing
        }
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        try {
            const result = await pool.query(query, values);
            if (result.rowCount === 0 || (req.params.od!=req.user.userId && !req.user.userId==1)) {
             return res.status(404).send({err:"User not found",message:'Ошибка'})  // Error if no user was deleted
            }else{
            //  await pool.query(query, values) 
             return  res.status(200).send("Delete");   
            }   
        } catch (error) {
            return res.status(404).send({err:"id aniqlanmadi",message:'Ошибка'})
        }
    }
    async  updateUser(req,res) {
        var {email, password, address,patronimic,lastname,firstname}=req.body
        var {id}=req.params
        const query = 'UPDATE users SET email = $1, password = $2, address = $3,patronimic=$4,lastname=$5,firstname=$6,time_update = current_timestamp WHERE id = $7 RETURNING *';
        const values = [email, password, address,patronimic,lastname,firstname, id];
        try {
            const result = await pool.query(query, values);
            if(result.rows[0].length==0){
                return res.status(404).send({message:'Ошибка'})
            }else{
              return  res.status(200).send(result.rows[0]);  
            }  
        } catch (error) {
            return res.status(404).send({err:error,message:'Ошибка'})
        }
    }
    async  updateUser2(req,res) {
        var { email, password, address,patronimic,lastname,firstname,manager}=req.body
        var {id}=req.params
        const query = 'UPDATE users SET email = $1, password = $2, address = $3,patronimic=$4,lastname=$5,firstname=$6,manager=$7,time_update = current_timestamp WHERE id = $8 RETURNING *';
        const values = [email, password, address,patronimic,lastname,firstname,manager, id];
        try {
            const result = await pool.query(query, values);
            if(result.rows[0].length==0){
                return res.status(404).send({message:'Ошибка'})
            }else{
              return  res.status(200).send(result.rows[0]);  
            }  
        } catch (error) {
            return res.status(404).send({err:error,message:'Ошибка'})
        }
    }
    async  loginUser(req,res) {
        const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        var {email, password}=req.body
        const values = [email, password];
        try {
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                res.status(500).send("error")
            }else{
                const user = result.rows[0];
            const token = jwt.sign({ userId: user.id, email: user.email,admin:user.admin,manager:user.manager}, process.env.JWT_KEY);
            user.token=token
            return  res.status(200).send(result.rows[0]);  
            }
          
        } catch (error) {
            res.status(500).send( {message: 'Internal Server Error',error})
        }
    }  
}



let manager = new Manager()
module.exports = manager