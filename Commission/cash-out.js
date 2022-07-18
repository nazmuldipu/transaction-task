import Commissions from "../Constants/Commissions.js";
import CURRENCY from "../Constants/Currency.js";
import PERSON_TYPE from '../Constants/PersonType.js';
import {
    calculateWeek,
    roundedCurrency,
    getUser
} from "./utils.js";

const PERCENTAGE_MAX = 100;

const getLegalCommission = (amount) => {
    const COMMISSION_TYPE = Commissions["cash-out"][PERSON_TYPE.LEGAL];
    const res = amount * (COMMISSION_TYPE.percents / PERCENTAGE_MAX);

    if (res < COMMISSION_TYPE.min.amount) {
        return COMMISSION_TYPE.min.amount.toFixed(CURRENCY.EUR.FRACTION_DIGIT);
    }
    return roundedCurrency(res, CURRENCY.EUR.SMALLEST_CURRENCY_DECIMAL);
}

const getNaturalCommission = (users, transaction) => {
    const COMMISSION_TYPE = Commissions["cash-out"][PERSON_TYPE.NATURAL];
    const { operation, date } = transaction;
    const { amount } = operation;
    const week = calculateWeek(date);
    const user = getUser(users, transaction.user_id);
    let res = 0;

    if (user.isMaxLimitExceed(week)) {
        user.addTransaction(week, amount);
        res = amount * COMMISSION_TYPE.percents / PERCENTAGE_MAX;
        return roundedCurrency(res, CURRENCY.EUR.SMALLEST_CURRENCY_DECIMAL);
    }

    let amoutTocalculate = amount - user.getTransaction(week) - COMMISSION_TYPE.week_limit.amount;
    user.addTransaction(week, amount);
    if (amoutTocalculate > 0) {
        res = amoutTocalculate * COMMISSION_TYPE.percents / PERCENTAGE_MAX;
    }
    
    return roundedCurrency(res, CURRENCY.EUR.SMALLEST_CURRENCY_DECIMAL);
}

const CashOutCommision = (users, transaction) => {
    const { user_type, operation } = transaction;
    const { amount, currency } = operation;
    
    if (currency === CURRENCY.EUR.CODE) {
        if (user_type === 'natural') {
            return getNaturalCommission(users, transaction);
        } else if (user_type === 'juridical') {
            return getLegalCommission(amount);
        }

        return `${user_type} is not a valid user`;
    }
    return `${currency} is a invalid currency`;
}

export default CashOutCommision;