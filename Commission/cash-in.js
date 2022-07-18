import Commissions from "../Constants/Commissions.js";
import CURRENCY from "../Constants/Currency.js";
import { roundedCurrency } from "./utils.js";

const PERCENTAGE_MAX = 100;
const TRANSACTION_TYPE = Commissions["cash-in"];

const CashInCommision = (transaction) => {
    const {
        amount,
        currency
    } = transaction.operation;

    if (currency === CURRENCY.EUR.CODE) {
        const result = amount * (TRANSACTION_TYPE.percents / PERCENTAGE_MAX);
        if (result > TRANSACTION_TYPE.max.amount) {
            return TRANSACTION_TYPE.max.amount.toFixed(CURRENCY.EUR.FRACTION_DIGIT);
        }
        return roundedCurrency(result, CURRENCY.EUR.FRACTION_DIGIT);
    }
    return `${currency} is a invalid currency`;
}

export default CashInCommision;