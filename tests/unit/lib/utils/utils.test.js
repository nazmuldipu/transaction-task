import {
    roundedCurrency,
    calculateYearWeek,
    getUser
} from '../../../../lib/utils/utils.js';

describe('Commission Utils', () => {
    describe('roundedCurrency', () => {
        it("should return '0.00' when given 0", () => {
            const result = roundedCurrency(0, 2);
            expect(result).toBe('0.00');
        });
        it('should rounded to the smallest currency item to upper bound ', () => {
            const value = 0.023;
            const decimalPlaces = 2;
            const result = roundedCurrency(value, decimalPlaces);
            expect(result).toBe('0.03');
        })
        it('Should return 0.001', () => {
            const resp = roundedCurrency(0.0004, 3);
            expect(resp).toBe('0.001');
        });
        it('Should return 0.2', () => {
            const resp = roundedCurrency(0.1005, 1);
            expect(resp).toBe('0.2');
        });
    });
    describe('calculateYearWeek', () => {
        it('should retun -1 when given null', () => {
            const result = calculateYearWeek(null);
            expect(result).toBe(-1);
        });
        it('should return 1 when given "2018-01-01"', () => {
            const result = calculateYearWeek('2018-01-01');
            expect(result).toBe("2018_1");
        });
        it('should return 23 when given "2018-06-01"', () => {
            const result = calculateYearWeek('2018-06-01');
            expect(result).toBe("2018_22");
        });

    });
    describe('getUser', () => {
        it('should return new User when given 0', () => {
            const result = getUser([], 0);
            expect(typeof result).toBe('object');
            expect(result.id).toBe(0);
            expect(Array.isArray(result.weekTransaction)).toBe(true);
            expect(result.weekTransaction.length).toBe(0);
        });

        it('Should return new user with id 5', () => {
            const resp = getUser([], 5);
            expect(typeof resp).toBe('object');
            expect(resp).toHaveProperty('id', 5);
            expect(resp).toHaveProperty('weekTransaction', []);
        });

        it('Should return exiting user', () => {
            const array = [];
            array[3] = {
                id: 3,
                weekTransaction: ['week']
            };
            const resp = getUser(array, 3);
            expect(typeof resp).toBe('object');
            expect(resp).toHaveProperty('id', 3);
            expect(resp).toHaveProperty('weekTransaction', ['week']);
        });
    });
});