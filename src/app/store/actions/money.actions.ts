import { Action } from '@ngrx/store';

export enum EMoneyActions {
    SetBet = '[Money] Set Bet',
    StartBet = '[Money] Start Bet',
    WinBet = '[Money] Win Bet'
}

export class SetBet implements Action {
    public readonly type = EMoneyActions.SetBet;
    constructor(public payload: number) {}
}

export class StartBet implements Action {
    public readonly type = EMoneyActions.StartBet;
    constructor(public payload: number) {}
}

export class WinBet implements Action {
    public readonly type = EMoneyActions.WinBet;
    constructor(public payload: number) {}
}

export type MoneyActions =
    SetBet |
    StartBet |
    WinBet;
