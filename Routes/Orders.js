var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db")
const Auth=require("../middleware/auth.js")
router.post('/orders', async (req, res) => {
    try {
      const { trackId, sender } = req.body;
      const client = await pool.connect();
      const query = 'INSERT INTO orders (trackId, sender) VALUES ($1, $2) RETURNING *';
      const values = [trackId, sender];
      const result = await client.query(query, values);
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.get('/orders', async (req, res) => {
  try {
    const orders = 'SELECT * FROM orders';
    const ordersaddress = 'SELECT * FROM ordersaddress';
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(ordersaddress);
    const result3 = await pool.query(users);
for (let i = 0; i < result1.rows.length; i++) {
 result1.rows[i].insender=[]
for (let j = 0; j < result3.rows.length; j++) {
 if (result1.rows[i].sender==result3.rows[j].id) {
  result1.rows[i].insender.push(result3.rows[j])
 }
 }
}
for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].insender=[]
 for (let j = 0; j < result3.rows.length; j++) {
  if (result2.rows[i].sender==result3.rows[j].id) {
   result2.rows[i].insender.push(result3.rows[j])
  }
  }
 }
 for (let i = 0; i < result1.rows.length; i++) {
for (let j = 0; j < result2.rows.length; j++) {
if(result1.rows[i].id==result2.rows[j].ordersid && result2.rows[j].insender[0]){
  result1.rows[i].insender.push(result2.rows[j].insender[0])
}
}}
      res.json(result1.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/myorders',Auth.authenticateToken,async (req,res)=>{
  try {
    const orders = 'SELECT * FROM orders';
    const ordersaddress = 'SELECT * FROM ordersaddress';
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(ordersaddress);
    const result3 = await pool.query(users);
for (let i = 0; i < result1.rows.length; i++) {
 result1.rows[i].insender=[]
for (let j = 0; j < result3.rows.length; j++) {
 if (result1.rows[i].sender==result3.rows[j].id) {
  result1.rows[i].insender.push(result3.rows[j])
 }
 }
}
for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].insender=[]
 for (let j = 0; j < result3.rows.length; j++) {
  if (result2.rows[i].sender==result3.rows[j].id) {
   result2.rows[i].insender.push(result3.rows[j])
  }
  }
 }
 for (let i = 0; i < result1.rows.length; i++) {
for (let j = 0; j < result2.rows.length; j++) {
if(result1.rows[i].id==result2.rows[j].ordersid && result2.rows[j].insender[0]){
  result1.rows[i].insender.push(result2.rows[j].insender[0])
}
}}
var a=result1.rows.filter(item=>{item.sender===req.user.userId})
      res.json(result1.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }


})
router.get('/myorders2',Auth.authenticateToken,async (req,res)=>{
  try {
    const orders = 'SELECT * FROM orders';
    const ordersaddress = 'SELECT * FROM ordersaddress WHERE sender=$1 ';
    var  values=[req.user.userId]
    const users = 'SELECT address,email,id FROM users';
    const result1 = await pool.query(orders);
    const result2 = await pool.query(ordersaddress,values);
var data=[]
for (let i = 0; i < result2.rows.length; i++) {
 for (let j = 0; j < result1.rows.length; j++) {
  if( result2.rows[i].ordersid==result1.rows[j].id){
    data.push(result1.rows[j])
  }
 }
}
res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { trackId, sender } = req.body;
      const query = 'UPDATE orders SET trackId = $2, sender = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, trackId, sender];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;