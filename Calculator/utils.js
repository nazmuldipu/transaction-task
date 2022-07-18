import User from "../Model/User.js";

const roundedCurrency = (value, decimalPlaces = 2) => {
    if (!value) {
        return 0;
    }
    return Number(`${Math.ceil(`${value}e${decimalPlaces}`)}e-${decimalPlaces}`).toFixed(decimalPlaces);
};

const calculateWeek = (dateString) => {
    if (!dateString) {
        return -1;
    }
    const [year, month, day] = dateString.split('-');
    const currentdate = new Date(year, month - 1, day);

    let oneJan = new Date(currentdate.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
};

const setTransaction = (transactionTable, week, amount) => {
    if (transactionTable[week]) {
        transactionTable[week].amount += amount;
    } else {
        transactionTable[week] = {
            week,
            amount
        };
    }
}

const getTransaction = (transactionTable, week) => {
    if (transactionTable[week]) {
        return transactionTable[week].amount;
    }
    return 0;
}

const isMaxLimitExceed = (transactionTable, week, limit) => {
    if (transactionTable[week]) {
        const result = transactionTable[week].amount >= limit;
        return result;
    }
    return false;
}

const getUser = (users = [], id = 0) => {
    if (users[id] !== null && users[id] !== undefined) {
        return users[id];
    }
    
    users[id] = new User(id);
    return users[id];
};

export {
    roundedCurrency,
    calculateWeek,
    getUser
};