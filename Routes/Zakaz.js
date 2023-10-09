var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db")


// Create (POST) operation
router.post('/zakaz',auth.authenticateToken, async (req, res) => {
    try {
      const { status, menegerid, deckription, creator, oredersid } = req.body;
     
      const query = 'INSERT INTO zakaz (status, menegerid, deckription, creator, oredersid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [status, menegerid, deckription, creator, oredersid];
      const result = await pool.query(query, values);
     
      res.status(201).json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Read (GET) operation
  router.get('/zakaz',auth.authenticateToken, async (req, res) => {
    try {
     
      const query = 'SELECT * FROM zakaz';
      const result = await pool.query(query);
     
      res.json(result.rows);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update (PUT) operation
  router.put('/zakaz/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, menegerid, deckription, creator, oredersid } = req.body;
     
      const query = 'UPDATE zakaz SET status = $2, menegerid = $3, deckription = $4, creator = $5, oredersid = $6, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, status, menegerid, deckription, creator, oredersid];
      const result = await pool.query(query, values);
     
      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete (DELETE) operation
  router.delete('/zakaz/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
     
      const query = 'DELETE FROM zakaz WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
     
      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  










module.exports = router;