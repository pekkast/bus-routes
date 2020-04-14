import data from './reittiopas.json';
import { ITie, IDestination, IRoutePart, ILinjastot, IRoutePartOptions, IRouteLeg, IRoute } from './models';
import { hasDuplicates, getDurationMin, getMatchingKeys, getRouteParts, orderBy } from './helpers';

export const getBusStops = () => data.pysakit;

export const getDestinationsGetter = (roads: Array<ITie>) => (from: string): Array<IDestination> => roads
    .filter(r => [r.mista, r.mihin].indexOf(from) !== -1)
    .map(r => ({ place: r.mista === from ? r.mihin : r.mista, duration: r.kesto }));

const getDestinations = getDestinationsGetter(data.tiet);

export const routeExistsGetter = (lines: Array<Array<string>>) => (...places: Array<string>) => {
    const part = places.join()
    return lines.reduce((result, line) => {
        return result || line.join().indexOf(part) !== -1 || line.reverse().join().indexOf(part) !== -1
    }, false);
}

const routeExists = routeExistsGetter(Object.values(data.linjastot));

const nextRoutes = (routes: Array<IRoutePart>, fastest: number) => routes
    .reduce((res: Array<IRoutePart>, route) => {
        const start = route.places.slice(-1).pop();
        const previous = route.places.slice(-2, -1).pop();
        return res.concat(getDestinations(start!)
            .filter(r => r.place !== previous)
            .filter(r => routeExists(start!, r.place))
            .map(r => ({
                places: route.places.concat(r.place),
                duration: route.duration + r.duration,
                durations: route.durations.concat(r.duration),
            })));
    }, [])
    .filter(r => r.duration < fastest)
    // Prevent loops
    .filter(r => !hasDuplicates(r.places))
    .reduce((res: Array<IRoutePart>, route) => {
        const last = route.places.slice(-1).pop();
        const idx = res.findIndex(r => r.places.slice(-1).pop() === last);
        if (idx !== -1) {
            if (res[idx].duration > route.duration) {
                res[idx] = route;
            }

            return res;
        }
        return res.concat(route);
    }, []);

const getMatches = (fromStart: Array<IRoutePart>, fromEnd: Array<IRoutePart>) => fromStart
    .reduce((res: Array<IRoutePart>, route: IRoutePart) => {
        const last = route.places.slice(-1).pop();
        const match = fromEnd.find(r => r.places.slice(-1).pop() === last);
        if (!match) {
            return res;
        }

        // We want to see if there might be a faster route that contains more stops than already matched
        // Hence the matches are not removed directly from search
        // This may cause routes with duplicates i.e. C,E,M,L,M,N,O, which is combined from C,E,M,L AND O,N,M,L
        const places = route.places.concat(match.places.slice(0, -1).reverse());
        if (hasDuplicates(places)) {
            return res;
        }

        return res.concat({
            places,
            durations: route.durations.concat(match.durations.slice().reverse()),
            duration: match.duration + route.duration,
        })
    }, []);

const findRoutes = (startPoint: string, endPoint: string) => {
    let fromStart: Array<IRoutePart> = [{ places: [startPoint], durations: [], duration: 0 }];
    let fromEnd: Array<IRoutePart> = [{ places: [endPoint], durations: [], duration: 0 }];


    const result: Array<IRoutePart> = []
    result.push(...getMatches(fromStart, fromEnd));

    do {
        fromStart = nextRoutes(fromStart, getDurationMin(result));
        result.push(...getMatches(fromStart, fromEnd));
        fromEnd = nextRoutes(fromEnd, getDurationMin(result));
        result.push(...getMatches(fromStart, fromEnd));

        const fastestResult = getDurationMin(result);
        const fastestFromEnd = getDurationMin(fromEnd);
        fromStart = fromStart.filter(r => r.duration < (fastestResult - fastestFromEnd));
        const fastestFromStart = getDurationMin(fromStart);
        fromEnd = fromEnd.filter(r => r.duration < (fastestResult - fastestFromStart));
    }  while (fromStart.length > 0 && fromEnd.length > 0);

    return result;
}

const getLinesGetter = (lines: ILinjastot) => {
    const parsed = Object.entries(lines)
        .map(([key, places]) => ({
            key,
            lineForward: places.join(),
            lineBackward: places.slice().reverse().join(),
        }));
    return (route: Array<string>, durations: Array<number>) => getRouteParts(route)
        .map((stops: string, idx): IRoutePartOptions => ({
            stops,
            duration: durations[idx],
            lines: parsed.reduce((result: Array<string>, { key, lineForward, lineBackward }) => {
                const stopsInLine = lineForward.indexOf(stops) !== -1 || lineBackward.indexOf(stops) !== -1;
                return stopsInLine ? result.concat(key) : result;
            }, []),
        }));
}
const getLines = getLinesGetter(data.linjastot);

const getLeastSwitches = (legs: Array<IRoutePartOptions>) => legs.slice(1)
    .reduce((result, item) => {
        const previous = result.slice(-1).pop();
        const lines = getMatchingKeys(previous!.lines, item.lines);

        if (lines.length > 0){
            result[result.length - 1] = {
                stops: `${previous!.stops}${item.stops.substring(1)}`,
                duration: previous!.duration + item.duration,
                lines,
            };
            return result;
        }

        return result.concat(item);
    }, legs.slice(0, 1))
    .map(({ stops, duration, lines}): IRouteLeg => ({ stops, duration, line: lines[0] }));

const getReasonableRoutes = (from: string, to: string): Array<IRoute> =>
    findRoutes(from, to).map(({ duration, places, durations }) => ({
        duration,
        legs: getLeastSwitches(getLines(places, durations))
    }));

const fastestCompare = (a: IRoute, b: IRoute) => a.duration < b.duration ? -1 : 1;
const easiestCompare = (a: IRoute, b: IRoute) => a.legs.length < b.legs.length ? -1 : 1;
export const getFastest = (from: string, to: string, quantity = 1) => orderBy(getReasonableRoutes(from, to), easiestCompare, fastestCompare).slice(0, quantity);
export const getEasiest = (from: string, to: string, quantity = 1) => orderBy(getReasonableRoutes(from, to), fastestCompare, easiestCompare).slice(0, quantity);
