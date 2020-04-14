import { getDurationMin, getMatchingKeys, getRouteParts, hasDuplicates, orderBy } from './helpers';
import { IRoutePart } from './models';

describe('/utils/routes', () => {
    describe('getDurationMin', () => {
        it('returns the minimum of durations of routes given', () => {
            const expected = 2;
            const initial = [{
                duration: 7,
            }, {
                duration: expected,
            }, {
                duration: 3,
            }] as Array<IRoutePart>;

            expect(getDurationMin(initial)).toEqual(expected);
        });

        it('returns Infinity for empty array', () => {
            expect(getDurationMin([])).toEqual(Infinity);
        });
    });

    describe('hasDuplicates', () => {
        it('returns true if some value emerges more than once in given array', () => {
            expect(hasDuplicates(['d', 'foo', 'ioh', 'd'])).toBeTruthy();
        })

        it('returns false if array is unique', () => {
            expect(hasDuplicates(['d', 'foo', 'ioh', 'dd'])).toBeFalsy();
        })
    });

    describe('getMatchingKeys', () => {
        it('returns the values that exist in both arrays', () => {
            expect(getMatchingKeys(['d', 'e'], ['e'])).toEqual(['e']);
            expect(getMatchingKeys(['d', 'e', 'g'], ['r', 'g', 's', 'd'])).toEqual(['d', 'g']);
        });

        it('returns empty array if arrays have no values in common', () => {
            expect(getMatchingKeys(['d', 'e'], [])).toEqual([]);
            expect(getMatchingKeys(['d', 'e', 'g'], ['r', 't', 's'])).toEqual([]);
        });
    });

    describe('getRouteParts', () => {
        it('returns array of comma separated string pairs from given string array, the array length is therefore one less than original', () => {
            expect(getRouteParts(['d', 'a', 'f'])).toEqual(['d,a', 'a,f']);
            expect(getRouteParts(['r', 'd', 'a', 'f', 'ä'])).toEqual(['r,d', 'd,a', 'a,f', 'f,ä']);
        });
    });

    describe('orderBy<T>', () => {
        it('returns given array sorted with given sorter functions', () => {
            const initial = ['b', 'c', 'a'];
            const expected = ['a', 'b', 'c'];
            const actual = orderBy(initial, (a: string, b: string) => a < b ? -1 : 1);
            expect(actual).toEqual(expected);
        });

        it('does not affect the original array', () => {
            const initial = ['b', 'c', 'a'];
            const expected = ['a', 'b', 'c'];
            orderBy(initial, (a: string, b: string) => a < b ? -1 : 1);
            expect(initial).not.toEqual(expected);
        });

        it('handles multiple sorters', () => {
            const initial = ['b', 'c', 'a'];
            const expected = ['c', 'b', 'a'];
            const actual = orderBy(initial, (a: string, b: string) => a < b ? -1 : 1, (a: string, b: string) => a < b ? 1 : -1);
            expect(actual).toEqual(expected);
        });
    });
});