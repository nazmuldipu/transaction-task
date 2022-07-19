import CommissionCalulator from '../../../../lib/commission/commission-calculator.js';

describe('CommissionCalulator', () => {
    let transaction;

    beforeEach(() => {
        transaction = {
            "date": "2016-01-05",
            "user_id": 1,
            "user_type": "natural",
            "type": "cash_out",
            "operation": {
                "amount": 200,
                "currency": "EUR"
            }
        };
    });

    it("Should return '0.06' for transaction type 'cash_in'", () => {
        transaction.type = 'cash_in';

        const resp = CommissionCalulator([], transaction);
        expect(resp).toBe('0.06');
    });

    it("Should return '0.00' for transaction type 'cash_out'", () => {
        const resp = CommissionCalulator([], transaction);
        expect(resp).toBe('0.00');
    });

    it("Should return '87.00' for transaction type 'cash_out' 30000.00 EUR", () => {
        transaction.operation.amount = 30000.00;

        const resp = CommissionCalulator([], transaction);
        expect(resp).toBe('87.00');
    });

    it("Should return expected value for transaction type 'cash_out' or 'cash_in' ", () => {
        const users = [];
        let transactions = [
            { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
            { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
            { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
             { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
            { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
            { "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
            { "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } },
            { "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
            { "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
        ];
        const results = ["0.06", "0.90", "87.00", "3.00", "0.30", "0.30", "5.00", "0.00", "0.00"];
        for (let i = 0; i < transactions.length; i++) {
            const resp = CommissionCalulator(users, transactions[i]);
            expect(resp).toBe(results[i]);
        }
    });

});