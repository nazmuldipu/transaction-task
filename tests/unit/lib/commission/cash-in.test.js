import CashInCommision from "../../../../lib/commission/cash-in.js";

describe('CashInCommision', () => {
    let transaction;

    beforeEach(() => {
        transaction = {
            "date": "2016-01-05",
            "user_id": 1,
            "user_type": "natural",
            "type": "cash_in",
            "operation": {
                "amount": 300,
                "currency": "EUR"
            }
        };
    });

    it('Should return 0.90 for Cash in commision with 300.00 EUR amount', () => {
        const resp = CashInCommision(transaction);
        expect(resp).toBe('0.09');
    });

    it('Should return BDT is a invalid currency for currency = BDT', () => {
        transaction.operation.currency = 'BDT';
        const resp = CashInCommision(transaction);
        expect(resp).toBe('BDT is a invalid currency');
    });

    it('Should return 5.00 if exceed maximum commission rate', () => {
        transaction.operation.amount = 50000;
        const resp = CashInCommision(transaction);
        expect(resp).toBe('5.00');
    });
});