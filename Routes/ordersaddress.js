var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db")

router.post('/ordersaddress', async (req, res) => {
    try {
      const { ordersid, sender } = req.body;
      const client = await pool.connect();
      const query = 'INSERT INTO ordersaddress (ordersid, sender) VALUES ($1, $2) RETURNING *';
      const values = [ordersid, sender];
      const result = await client.query(query, values);
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/ordersaddress', async (req, res) => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM ordersaddress';
      const result = await client.query(query);
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/ordersaddress/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { ordersid, sender } = req.body;
      const client = await pool.connect();
      const query = 'UPDATE ordersaddress SET ordersid = $2, sender = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, ordersid, sender];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/ordersaddress/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const query = 'DELETE FROM ordersaddress WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;