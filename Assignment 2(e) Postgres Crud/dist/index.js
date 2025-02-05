"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 8000;
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres@25',
    port: 5432,
});
app.use(express_1.default.json());
// Function to check if table exists and create it if it doesn't
const checkAndCreateTable = () => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield pool.query(tableExistsQuery, [tableName]);
        const tableExists = res.rows[0].exists;
        if (!tableExists) {
            yield pool.query(createTableQuery);
            console.log(`Table "${tableName}" created successfully.`);
        }
        else {
            console.log(`Table "${tableName}" already exists.`);
        }
    }
    catch (err) {
        console.error('Error checking or creating table:', err);
    }
});
// Ensure the table exists before handling any requests
checkAndCreateTable();
// Create
app.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const result = yield pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.json(result.rows[0]);
}));
// Read
app.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM items');
    res.json(result.rows);
}));
app.get('/items/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const result = yield pool.query('SELECT * FROM items WHERE name = $1', [name]);
    res.json(result.rows[0]);
}));
// Update
app.put('/items/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { description } = req.body;
    const result = yield pool.query('UPDATE items SET description = $2 WHERE name = $1 RETURNING *', [name, description]);
    res.json(result.rows[0]);
}));
// Delete
app.delete('/items/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    yield pool.query('DELETE FROM items WHERE name = $1', [name]);
    res.sendStatus(204);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
