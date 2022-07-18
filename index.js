import TRANSACTION_TYPE from './Constants/TransactionType.js';
import CashInCommision from './Commission/cash-in.js';
import CashOutCommision from './Commission/cash-out.js';

// Read JSON file from arguments
import {
    readFileSync
} from 'fs';
const file = process.argv[2];
const data = readFileSync(file, 'utf8');


try {
    // Data validation
    const transactions = JSON.parse(data);
    if (!Array.isArray(transactions)) throw new Error('Invalid Input Data');
    const users = [];

    // Calculate commission for each transaction
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const { type } = transaction;

        switch (type) {
            case TRANSACTION_TYPE.CASH_IN:
                console.log(CashInCommision(transaction));
                break;
            case TRANSACTION_TYPE.CASH_OUT:
                console.log( CashOutCommision(users, transaction));
                break;
            default:
                console.log(`${type} is a invalid transaction type`);
                break;
        }
        // const commission = calculateCommission(transaction);
        // console.log(`${transaction.id} ${commission}`);
    }

} catch (err) {
    console.log(err);
}