import { initialGameState, IGameState } from '../state/game.state';
import { GameActions, EGameActions } from '../actions/game.actions';

export const gameReducers = (
    state = initialGameState,
    action: GameActions
): IGameState => {
    switch (action.type) {
        case EGameActions.GetGame: {
            return {
                ...state
            };
        }
        case EGameActions.SetSpinning: {
            return {
                ...state,
                spinning: action.payload,
                spinDisabled: true
            };
        }
        case EGameActions.SetResult: {
            switch (action.payload.index) {
                case 0:
                    return {
                        ...state,
                        resultOne: action.payload.result,
                        resultSetCounter: state.resultSetCounter + 1
                    };
                case 1:
                    return {
                        ...state,
                        resultTwo: action.payload.result,
                        resultSetCounter: state.resultSetCounter + 1
                    };
                case 2:
                    return {
                        ...state,
                        resultThree: action.payload.result,
                        resultSetCounter: state.resultSetCounter + 1
                    };
                case 3:
                    return {
                        ...state,
                        resultFour: action.payload.result,
                        resultSetCounter: state.resultSetCounter + 1
                    };
                case 4:
                    return {
                        ...state,
                        resultFive: action.payload.result,
                        resultSetCounter: state.resultSetCounter + 1
                    };
            }
            break;
        }
        case EGameActions.SetResultCounter: {
            return {
                ...state,
                resultSetCounter: action.payload
            };
        }
        case EGameActions.SetSpinDisabled: {
            return {
                ...state,
                spinDisabled: action.payload
            };
        }
        default:
            return state;
    }
};
