import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IMoneyState } from '../state/money.state';

const selectMoney = (state: IAppState) => state.money;
export const selectBet = (state: IAppState) => state.money.bet;
export const selectBalance = (state: IAppState) => state.money.balance;
export const selectWin = (state: IAppState) => state.money.win;
export const selectBetAndBalance = (state: IAppState) => {
    return {
        bet: state.money.bet,
        balance: state.money.balance
    };
};

export const selectGameObject = createSelector(
    selectMoney,
    (state: IMoneyState) => state
);
