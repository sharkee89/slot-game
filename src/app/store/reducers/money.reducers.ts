import { MoneyActions, EMoneyActions } from '../actions/money.actions';
import { initialMoneyState, IMoneyState } from '../state/money.state';

export const moneyReducers = (
    state = initialMoneyState,
    action: MoneyActions
): IMoneyState => {
    switch (action.type) {
        case EMoneyActions.SetBet: {
            return {
                ...state,
                bet: action.payload
            };
        }
        case EMoneyActions.StartBet: {
            return {
                ...state,
                balance: state.balance - action.payload
            };
        }
        case EMoneyActions.WinBet: {
            return {
                ...state,
                balance: state.balance + action.payload,
                win: state.win + action.payload
            };
        }
        default:
            return state;
    }
};
