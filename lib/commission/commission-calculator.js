import TRANSACTION_TYPE from '../config/transaction-type.js';
import CashInCommision from './cash-in.js';
import CashOutCommision from './cash-out.js';

const CommissionCalulator = (users, transaction) => {
    // Calculate commission for transaction
    const {
        type
    } = transaction;

    switch (type) {
        case TRANSACTION_TYPE.CASH_IN:
            return CashInCommision(transaction);

        case TRANSACTION_TYPE.CASH_OUT:
            return CashOutCommision(users, transaction);

        default:
            return `${type} is a invalid transaction type`;
    }
}

export default CommissionCalulator;