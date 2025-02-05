const express = require('express');
import {splitString} from './logic';
const app = express();
const PORT = 8000;

// Import Request and Response types with aliases
const { Request: ExpressRequest, Response: ExpressResponse } = require('express');

app.use(express.json());

app.get('/split/:input', (req: { params: { input: any; }; }, res: { json: (arg0: any) => void; }) => {
    const { input } = req.params;
    const result = splitString(input);
      res.json(result);
});

app.listen(PORT, () => {
    console.log("Server Started on port " + PORT);
});