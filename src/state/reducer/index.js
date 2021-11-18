import { combineReducers } from 'redux'
import accountReducer from './account'
import userReducer from './user'
import foodReducer from './food'

const reducers = combineReducers({
    account:  accountReducer,
    user: userReducer,
    food: foodReducer,
});

export default reducers;