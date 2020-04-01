import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { gameReducers } from './game.reducers';
import { moneyReducers } from './money.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    game: gameReducers,
    money: moneyReducers
};
