var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db");
const auth = require('../middleware/auth');

router.post('/ordersaddress',auth.authenticateToken, async (req, res) => {
    try {
      const { orders_id, sender } = req.body;
      const query = 'INSERT INTO orders_address (orders_id, sender) VALUES ($1, $2) RETURNING *';
      const values = [orders_id, sender];
      const result = await pool.query(query, values);
     
      res.status(201).json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/ordersaddress',auth.authenticateToken, async (req, res) => {
    try {

      const query = 'SELECT * FROM orders_address';
      const result = await pool.query(query);

      res.json(result.rows);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/ordersaddress/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { orders_id, sender } = req.body;
    
      const query = 'UPDATE orders_address SET orders_id = $2, sender = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, orders_id, sender];
      const result = await pool.query(query, values);

      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/ordersaddress/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
    
      const query = 'DELETE FROM orders_address WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
  
      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;