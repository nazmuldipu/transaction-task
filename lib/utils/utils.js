import User from "../models/user.js";

const roundedCurrency = (value, decimalPlaces = 2) => {
    if (!value) {
        return value.toFixed(decimalPlaces);
    }

    return Number(`${Math.ceil(`${value}e${decimalPlaces}`)}e-${decimalPlaces}`).toFixed(decimalPlaces);
};

const calculateYearWeek = (dateString) => {
    if (!dateString) {
        return -1;
    }
    const [year, month, day] = dateString.split('-');
    const currentdate = new Date(Date.UTC(year, month - 1, day));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    currentdate.setUTCDate(currentdate.getUTCDate() + 4 - (currentdate.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(currentdate.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((currentdate - yearStart) / 86400000) + 1) / 7);
    return (year + "_" + weekNo );
};

const getUser = (users = [], id = 0) => {
    if (users[id] !== null && users[id] !== undefined) {
        return users[id];
    }

    users[id] = new User(id);
    return users[id];
};

export {
    roundedCurrency,
    calculateYearWeek,
    getUser
};