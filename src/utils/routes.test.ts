import { ITie, IDestination, getDestinationsGetter,
    getDurationMin, IRoutePart, hasDuplicates, routeExistsGetter, getMatchingKeys, getRouteParts, orderBy } from './routes'

const tietMock: Array<ITie> = [{
    mista: 'A',
    mihin: 'B',
    kesto: 2,
}, {
    mista: 'B',
    mihin: 'C',
    kesto: 3,
}, {
    mista: 'R',
    mihin: 'A',
    kesto: 1,
}, {
    mista: 'B',
    mihin: 'D',
    kesto: 2,
}, {
    mista: 'A',
    mihin: 'D',
    kesto: 5,
}];

describe('/utils/routes', () => {
    describe('getDestinationsGetter', () => {
        it('returns destinations with duration from given stop', () => {
            const expected: Array<IDestination> = [{
                place: 'B',
                duration: 2,
            }, {
                place: 'R',
                duration: 1,
            }, {
                place: 'D',
                duration: 5,
            }];

            expect(getDestinationsGetter(tietMock)('A')).toEqual(expected);
        });
    });

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

    describe('routeExistsGetter', () => {
        const lines = [
            ['A', 'C', 'E'],
            ['E', 'B', 'R', 'S'],
        ];
        const routeExists = routeExistsGetter(lines);

        it('returns true if given places exist next to one another in any of defined lines', () => {
            expect(routeExists('C', 'E')).toBeTruthy();
            expect(routeExists('R', 'B')).toBeTruthy();
        });

        it('can handle shorter and longer lists', () => {
            expect(routeExists('C')).toBeTruthy();
            expect(routeExists('C', 'A')).toBeTruthy();
            expect(routeExists('E', 'B', 'R')).toBeTruthy();
        });

        it('returns false if places do not exist', () => {
            expect(routeExists('Ä', 'D')).toBeFalsy();
        });

        it('returns false if places are not next to one another', () => {
            expect(routeExists('B', 'S')).toBeFalsy();
        });

        it('returns false for empty lines', () => {
            expect(routeExistsGetter([])('Ä', 'D')).toBeFalsy();
        });
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