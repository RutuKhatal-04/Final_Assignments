import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 8000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres@25',
  port: 5432,
});

app.use(express.json());

// Function to check if table exists and create it if it doesn't
const checkAndCreateTable = async () => {
  const tableName = 'items';
  const createTableQuery = `
    CREATE TABLE items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      description TEXT
    );
  `;

  const tableExistsQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = $1
    );
  `;

  try {
    const res = await pool.query(tableExistsQuery, [tableName]);
    const tableExists = res.rows[0].exists;

    if (!tableExists) {
      await pool.query(createTableQuery);
      console.log(`Table "${tableName}" created successfully.`);
    } else {
      console.log(`Table "${tableName}" already exists.`);
    }
  } catch (err) {
    console.error('Error checking or creating table:', err);
  }
};

<<<<<<< HEAD
// Ensure the table exists before handling any requests
=======
>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
checkAndCreateTable();

// Create
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  const result = await pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  res.json(result.rows[0]);
});

// Read
app.get('/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items');
  res.json(result.rows);
});

app.get('/items/:name', async (req, res) => {
  const { name } = req.params;
  const result = await pool.query('SELECT * FROM items WHERE name = $1', [name]);
  res.json(result.rows[0]);
});

// Update
app.put('/items/:name', async (req, res) => {
  const { name } = req.params;
  const { description } = req.body;
  const result = await pool.query(
    'UPDATE items SET description = $2 WHERE name = $1 RETURNING *',
    [name, description]
  );
  res.json(result.rows[0]);
});

// Delete
app.delete('/items/:name', async (req, res) => {
  const { name } = req.params;
  await pool.query('DELETE FROM items WHERE name = $1', [name]);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
