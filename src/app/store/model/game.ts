export interface IGame {
    spinning: boolean;
    resultOne: any[];
    resultTwo: any[];
    resultThree: any[];
    resultFour: any[];
    resultFive: any[];
    resultSetCounter: number;
}

export interface IResultPayload {
    result: any;
    index: number;
}