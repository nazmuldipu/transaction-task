import PERSON_TYPE from './PersonType.js';

const Commissions = {
    "cash-in": {
        percents: 0.03,
        max: {
            amount: 5,
            currency: "EUR"
        }
    },
    "cash-out": {
        [PERSON_TYPE.NATURAL]: {
            percents: 0.3,
            week_limit: {
                amount: 1000,
                currency: "EUR"
            }
        },
        [PERSON_TYPE.LEGAL]: {
            percents: 0.3,
            min: {
                amount: 0.5,
                currency: "EUR"
            }
        }
    }
}

export default Commissions;