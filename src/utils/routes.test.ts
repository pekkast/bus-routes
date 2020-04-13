import { ITie, IDestination, getDestinationsGetter,
    getDurationMin, IRoutePart, hasDuplicates } from './routes'

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
});