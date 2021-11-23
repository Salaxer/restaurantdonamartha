import { combineReducers } from 'redux';
import userReducer from './user';
import foodReducer from './food';
import conectionReducer from './conectionUser';
import offerReducer from './offers'; 

const reducers = combineReducers({
    user: userReducer,
    food: foodReducer,
    conectionID: conectionReducer,
    offer: offerReducer,
});

export default reducers;