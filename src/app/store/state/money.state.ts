export interface IMoneyState {
    bet: number;
    balance: number;
    win: number;
}

export const initialMoneyState: IMoneyState = {
    bet: 0,
    balance: 100,
    win: 0
};
