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
                money: {
                    ...state.money,
                    bet: action.payload
                }
            };
        }
        case EMoneyActions.StartBet: {
            return {
                ...state,
                money: {
                    ...state.money,
                    balance: state.money.balance - action.payload
                }
            };
        }
        case EMoneyActions.WinBet: {
            return {
                ...state,
                money: {
                    ...state.money,
                    balance: state.money.balance + action.payload
                }
            };
        }
        default:
            return state;
    }
};
