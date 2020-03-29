import { Action } from '@ngrx/store';
import { IResultPayload } from '../model/game';

export enum EGameActions {
    GetGame = '[Game] Get Game',
    SetSpinning = '[Game] Set Spinning',
    SetResult = '[Game] Set Result',
    SetSpinDisabled = '[Game] Set Spin Disabled'
}

export class GetGame implements Action {
    public readonly type = EGameActions.GetGame;
}

export class SetSpinning implements Action {
    public readonly type = EGameActions.SetSpinning;
    constructor(public payload: boolean) {}
}

export class SetResult implements Action {
    public readonly type = EGameActions.SetResult;
    constructor(public payload: IResultPayload) {}
}

export class SetSpinDisabled implements Action {
    public readonly type = EGameActions.SetSpinDisabled;
    constructor(public payload: boolean) {}
}

export type GameActions =
    GetGame |
    SetSpinning |
    SetResult |
    SetSpinDisabled;
