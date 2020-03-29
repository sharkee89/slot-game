import { IGame } from '../model/game';

export interface IGameState {
    game: IGame;
    spinDisabled: boolean;
}

export const initialGameState: IGameState = {
    game: {
        spinning: false,
        resultOne: [],
        resultTwo: [],
        resultThree: [],
        resultFour: [],
        resultFive: [],
        resultSetCounter: 0,
    },
    spinDisabled: false
};
