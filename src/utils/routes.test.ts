import { ITie, IDestination, getDestinationsGetter,
    getDurationMin, IRoutePart, hasDuplicates, routeExistsGetter } from './routes'

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
});