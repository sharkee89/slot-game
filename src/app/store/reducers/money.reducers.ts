import { MoneyActions, EMoneyActions } from '../actions/money.actions';
import { initialMoneyState, IMoneyState } from '../state/money.state';

export const moneyReducers = (
    state = initialMoneyState,
    action: MoneyActions
): IMoneyState => {
    switch(action.type) {
        case EMoneyActions.SetBet: {
            return {
                ...state,
                money: {
                    ...state.money,
                    bet: action.payload
                }
            };
        }
        default:
            return state;
    }
};
