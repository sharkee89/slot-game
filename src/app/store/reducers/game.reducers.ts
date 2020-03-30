import { initialGameState, IGameState } from '../state/game.state';
import { GameActions, EGameActions } from '../actions/game.actions';

export const gameReducers = (
    state = initialGameState,
    action: GameActions
): IGameState => {
    switch(action.type) {
        case EGameActions.GetGame: {
            return {
                ...state
            };
        }
        case EGameActions.SetSpinning: {
            return {
                ...state,
                game: {
                    ...state.game,
                    spinning: action.payload
                }
            };
        }
        case EGameActions.SetResult: {
            switch(action.payload.index) {
                case 0:
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            resultOne: action.payload.result,
                            resultSetCounter: state.game.resultSetCounter + 1
                        }
                    };
                case 1:
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            resultTwo: action.payload.result,
                            resultSetCounter: state.game.resultSetCounter + 1
                        }
                    };
                case 2:
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            resultThree: action.payload.result,
                            resultSetCounter: state.game.resultSetCounter + 1
                        }
                    };
                case 3:
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            resultFour: action.payload.result,
                            resultSetCounter: state.game.resultSetCounter + 1
                        }
                    };
                case 4:
                    return {
                        ...state,
                        game: {
                            ...state.game,
                            resultFive: action.payload.result,
                            resultSetCounter: state.game.resultSetCounter + 1
                        }
                    };
            }
            break;
        }
        case EGameActions.SetResultCounter: {
            return {
                ...state,
                game: {
                    ...state.game,
                    resultSetCounter: action.payload
                }
            }
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
