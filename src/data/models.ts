export interface ITie {
    mista: string,
    mihin: string,
    kesto: number,
}

export interface ILinjastot {
    [name: string]: Array<string>,
}

export interface IData {
    pysakit: Array<string>,
    tiet: Array<ITie>,
    linjastot: ILinjastot,
}

export interface IRoutePart {
    places: Array<string>,
    durations: Array<number>,
    duration: number,
}

export interface IDestination {
    place: string,
    duration: number,
}

export interface IRouteStops {
    stops: string,
    duration: number,
}

export interface IRoutePartOptions extends IRouteStops {
    lines: Array<string>,
}

export interface IRouteLeg extends IRouteStops {
    line: string,
}

export interface IRoute {
    legs: Array<IRouteLeg>,
    duration: number,
}
