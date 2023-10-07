const pool = require("../db")
const jwt = require('jsonwebtoken')


class Manager{
    async getAll(req,res){
        try{
            pool.query("SELECT * FROM trek_code", (err, result) => {
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
    async createTack(req,res) {
        let {status, menegerid,deckription,sender}=req.body
        const query = 'INSERT INTO trek_code (status, menegerid,deckription,sender) VALUES ($1, $2, $3 , $4) RETURNING *';
        const values = [status, menegerid , deckription, sender];
        try {
            const result = await pool.query(query, values);
            return  res.status(200).send(result.rows[0]);
        } catch (error) {
            return res.status(404).send({err:error,message:'Ошибка'})
        }
    }
    async deleteTack(req,res) {
        var {id}=req.params
        if (!id) {
            return res.status(404).send({err:"ID not provided",message:'Ошибка'}) // Error if ID is missing
        }
        const query = 'DELETE FROM trek_code WHERE id = $1';
        const values = [id];
        try {
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
             return res.status(404).send({err:"Trek not found",message:'Ошибка'})  // Error if no user was deleted
            }else{
            //  await pool.query(query, values) 
             return  res.status(200).send("Delete");   
            }   
        } catch (error) {
            return res.status(404).send({err:"id aniqlanmadi",message:'Ошибка'})
        }
    }
    async  updateTack(req,res) {
        var { status, menegerid, deckription,sender}=req.body
        var {id}=req.params
        const query = 'UPDATE trek_code SET status = $1, menegerid = $2, deckription = $3,sender=$4,time_update = current_timestamp WHERE id = $5 RETURNING *';
        const values = [status, menegerid, deckription,sender,id];
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
}



let manager = new Manager()
module.exports = manager