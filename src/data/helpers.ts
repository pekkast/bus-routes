import { IRoutePart } from "./models";

export const getDurationMin = (legs: Array<IRoutePart>): number => legs.reduce((result: number, r: IRoutePart) => Math.min(result, r.duration), Infinity);

export const getMatchingKeys = (keys1: Array<string>, keys2: Array<string>) => {
    return keys1.filter(k => keys2.indexOf(k) !== -1);
};

export const getRouteParts = (arr: Array<string>) => Array(arr.length - 1).fill('').map((v, i) => arr.slice(i, i + 2).join());

export const hasDuplicates = (arr: Array<string>) => {
    const unique = [...new Set(arr)];
    return arr.length !== unique.length;
};

export function orderBy<T>(arr: Array<T>, ...sorters: Array<(a: T, b: T) => 0 | 1 | -1>) {
    return sorters.reduce((result, sortBy) => {
        result.sort(sortBy);
        return result;
    }, arr.slice());
}
