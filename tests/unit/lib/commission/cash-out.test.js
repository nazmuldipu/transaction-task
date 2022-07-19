import CashOutCommission from '../../../../lib/commission/cash-out.js';

describe('CashOutCommission', () => {
    let transaction;

    beforeEach(() => {
        transaction = {
            "date": "2016-01-05",
            "user_id": 1,
            "user_type": "natural",
            "type": "cash_in",
            "operation": {
                "amount": 200,
                "currency": "EUR"
            }
        };
    });

    describe('Cash out for juridical user', () => {
        it('Should return BDT is a invalid currency for currency = BDT', () => {
            transaction.operation.currency = 'BDT';

            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('BDT is a invalid currency');
        });

        it('Should return Primary is not a valid user currency for user_type = Primary', () => {
            transaction.user_type = 'Primary';

            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('Primary is not a valid user');
        });

        it('Should return 0.90 for Cash out commision with 300.00 EUR amount for juridical user', () => {
            transaction.user_type = 'juridical';
            transaction.operation.amount = 300;

            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('0.90');
        });

        it('Should return 0.50 as Cash out commision test where commisions do not exceed 0.50', () => {
            transaction.user_type = 'juridical';
            transaction.operation.amount = 2.00;
            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('0.50');
        });
    });

    describe('Cash out for natural user', () => {

        it('Should return 87.00 for Cash out commision with 30000.00 EUR amount', () => {
            transaction.operation.amount = 30000.00;
            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('87.00');
        });

        it('Should return 0.00 as Cash out commision when user has not reached limit for the week', () => {

            const resp = CashOutCommission([], transaction);
            expect(resp).toBe('0.00');
        });

        it('Should return 0.00 as Cash out commision test when user has reached limit for the week', () => {
            const users = [];
            transaction.user_id = 3;
            transaction.operation.amount = 600.00;
            let resp = CashOutCommission(users, transaction);
            expect(resp).toBe('0.00');

            // transaction.operation.amount = 1000.00;
            resp = CashOutCommission(users, transaction);
            expect(resp).toBe('0.60');
            
        });
    });
});