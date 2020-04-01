import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IMoneyState } from '../state/money.state';
import { BrowserTransferStateModule } from '@angular/platform-browser';

const selectMoney = (state: IAppState) => state.money;
export const selectBet = (state: IAppState) => state.money.money.bet;
export const selectBalance = (state: IAppState) => state.money.money.balance;
export const selectWin = (state: IAppState) => state.money.money.win;
export const selectBetAndBalance = (state: IAppState) => {
    return {
        bet: state.money.money.bet,
        balance: state.money.money.balance
    };
};

export const selectGameObject = createSelector(
    selectMoney,
    (state: IMoneyState) => state.money
);
