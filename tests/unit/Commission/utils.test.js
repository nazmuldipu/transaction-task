import {
    roundedCurrency,
    calculateWeek,
    getUser
} from '../../../Commission/utils.js';

describe('Commission Utils', () => {
    it('should rounded to the smallest currency item to upper bound ', () => {
        const value = 0.023;
        const decimalPlaces = 2;
        const result = roundedCurrency(value, decimalPlaces);
        expect(result).toBe('0.03');
    })
});