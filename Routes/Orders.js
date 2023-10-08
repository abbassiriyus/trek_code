var express = require('express');
var trekCodeRouter = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db")

trekCodeRouter.post('/orders', async (req, res) => {
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
  
  trekCodeRouter.get('/orders', async (req, res) => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM orders';
      const result = await client.query(query);
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  trekCodeRouter.put('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { trackId, sender } = req.body;
      const client = await pool.connect();
      const query = 'UPDATE orders SET trackId = $2, sender = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, trackId, sender];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  trekCodeRouter.delete('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = trekCodeRouter;