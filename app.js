const express = require('express');
const mysql = require('mysql2/promise'); // Use 'mysql2/promise' for async/await support
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const config = {
  host: 'localhost',
  user: 'Hrpatil',
  password: 'hrpatil',
  database: 'Collegedatabase',
};

const pool = mysql.createPool(config);

app.use(express.json());

app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Students');
    res.json(rows);
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.get('/api/students/:RollNo', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Students WHERE ID = ?', [req.params.ID]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const { ID , Name} = req.body;
    const [result] = await pool.execute('INSERT INTO Students (ID, Name) VALUES (?, ?)', [ID, Name]);
    res.json({ id: result.insertId,ID, Name });
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.put('/api/students/:ID', async (req, res) => {
  try {
    const { Name } = req.body;
    await pool.execute('UPDATE Students SET ID = ? WHERE Name = ?', [ID, req.params.Name]);
    res.json({ID: req.params.Name, ID });
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.delete('/api/students/:ID', async (req, res) => {
  try {
    await pool.execute('DELETE FROM Students WHERE ID = ?', [req.params.ID]);
    res.json({ ID: req.params.ID, message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
