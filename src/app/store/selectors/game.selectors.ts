import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IGameState } from '../state/game.state';

const selectGame = (state: IAppState) => state.game;
export const selectSpinning = (state: IAppState) => state.game.game.spinning;
export const selectSpinDisabled = (state: IAppState) => state.game.spinDisabled;

export const selectGameObject = createSelector(
    selectGame,
    (state: IGameState) => state.game
);
