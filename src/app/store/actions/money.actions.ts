import { Action } from '@ngrx/store';

export enum EMoneyActions {
    SetBet = '[Money] Set Bet'
}

export class SetBet implements Action {
    public readonly type = EMoneyActions.SetBet;
    constructor(public payload: number) {}
}

export type MoneyActions =
    SetBet;
