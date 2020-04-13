import { ITie, IDestination, getDestinationsGetter } from './routes'

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

});