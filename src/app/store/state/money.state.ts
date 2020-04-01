import { IMoney } from '../model/money';

export interface IMoneyState {
    money: IMoney;
}

export const initialMoneyState: IMoneyState = {
    money: {
        bet: 0,
        balance: 5000,
        win: 0
    }
};
