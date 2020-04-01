import { IGameState, initialGameState } from './game.state';
import { IMoneyState, initialMoneyState } from './money.state';

export interface IAppState {
    game: IGameState;
    money: IMoneyState;
}

export const initialAppState: IAppState = {
    game: initialGameState,
    money: initialMoneyState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
