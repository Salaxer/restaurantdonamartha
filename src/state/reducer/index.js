import { combineReducers } from 'redux';
import userReducer from './user';
import foodReducer from './food';
import conectioneducer from './conectionUser'; 

const reducers = combineReducers({
    user: userReducer,
    food: foodReducer,
    conectionID: conectioneducer,
});

export default reducers;