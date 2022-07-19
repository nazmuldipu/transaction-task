import CommissionCalulator from './lib/commission/commission-calculator.js';

// Read JSON file from arguments
import {
    readFileSync
} from 'fs';


try {
    // import data from input arguments
    const file = process.argv[2];
    if (!file) throw new Error('No file provided');
    const data = readFileSync(file, 'utf8');

    // Data validation
    const transactions = JSON.parse(data);
    if (!Array.isArray(transactions)) throw new Error('Invalid Input Data');
    
    const users = [];

    // Loop through transactions and calculate commission
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        console.log(CommissionCalulator(users, transaction));
    }

} catch (err) {
    console.log('Error:', err['message']);
}