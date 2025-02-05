import express, { Request, Response } from 'express';
import { concatenateString, isLeapYear, getSecretHandshake } from './logic';


const app = express();
const PORT = 8000;
 
app.use(express.json());

// Using req.params
app.get('/concat/:param1/:param2', (req: Request, res: Response) => {
    const { param1, param2 } = req.params;
    const result = concatenateString(param1, param2);
    res.json(result);
});

// Using req.query
app.get('/con-query', (req: Request, res: Response) => {
    const { param1, param2 } = req.query;

    if (typeof param1 === 'string' && typeof param2 === 'string') {
        const result = concatenateString(param1, param2);
        res.json(result);
    } else {
        res.status(400).json({ error: "Invalid query parameter" });
    }
});

// Check if a year is a leap year
app.get('/isLeap/:year', (req: Request, res: Response) :void => {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
    res.status(400).json({ error: 'Invalid year' });
    return;
    }

    const result = isLeapYear(year);
    res.json(result);
});


// Secret handshake API
app.get('/handshake/:number', (req: Request, res: Response):void => {
    const number = parseInt(req.params.number);
    if (isNaN(number) || number < 1 || number > 31) {
       res.status(400).json({ error: 'Invalid number. Please provide a number between 1 and 31.' });
       return;
    }

    const actions = getSecretHandshake(number);
    res.json({ actions });
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});