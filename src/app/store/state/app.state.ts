import { RouterReducerState } from '@ngrx/router-store';
import { IGameState, initialGameState } from './game.state';

export interface IAppState {
    // router?: RouterReducerState;
    game: IGameState;
}

export const initialAppState: IAppState = {
    game: initialGameState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
