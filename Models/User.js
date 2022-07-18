import Commissions from "../Constants/Commissions.js";
import PERSON_TYPE from '../Constants/PersonType.js';

export default class User {
    constructor(id) {
        this.id = id;
        this.weekTransaction = [];
    }

    addTransaction(week, amount) {
        if (this.weekTransaction[week]) {
            this.weekTransaction[week].amount += amount;
        } else {
            this.weekTransaction[week] = {
                week,
                amount
            };
        }
    }

    getTransaction(week) {
        if (this.weekTransaction[week]) {
            return this.weekTransaction[week].amount;
        }
        return 0;
    }

    isMaxLimitExceed(week) {
        if (this.weekTransaction[week]) {
            const result = this.weekTransaction[week].amount >= Commissions["cash-out"][PERSON_TYPE.NATURAL].week_limit.amount;
            return result;
        }
        return false;
    }
}