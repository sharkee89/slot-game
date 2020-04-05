export interface IGameState {
    spinning: boolean;
    resultOne: any[];
    resultTwo: any[];
    resultThree: any[];
    resultFour: any[];
    resultFive: any[];
    resultSetCounter: number;
    spinDisabled: boolean;
}

export const initialGameState: IGameState = {
    spinning: false,
    resultOne: [],
    resultTwo: [],
    resultThree: [],
    resultFour: [],
    resultFive: [],
    resultSetCounter: 0,
    spinDisabled: false
};
