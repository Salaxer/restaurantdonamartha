import { combineReducers } from 'redux'
import accountReducer from './account'
import userReducer from './user'

const reducers = combineReducers({
    account:  accountReducer,
    user: userReducer,
});

export default reducers;