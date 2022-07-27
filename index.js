import CommissionCalulator from './lib/commission/commission-calculator.js';
// Read JSON file from arguments
import {
    readFileSync
} from 'fs';
import express from 'express';
import routes from "./lib/routes.js";

let users = [];


try {
    // import data from input arguments
    const file = process.argv[2];
    if (!file) throw new Error('No file provided');
    const data = readFileSync(file, 'utf8');

    // Data validation
    const transactions = JSON.parse(data);
    if (!Array.isArray(transactions)) throw new Error('Invalid Input Data');

    // Loop through transactions and calculate commission
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        console.log(CommissionCalulator(users, transaction));
    }

} catch (err) {
    console.log(err['message']);
}

//clear users for API Call
users = [];

// Define API here
const port = process.env.PORT || 3000;
const app = express();
routes(app, users);

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

export default server;