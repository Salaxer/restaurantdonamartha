import { createStore, combineReducers } from "redux";

const userRedux = (state = '', action) =>{
    switch (action.type) {
        case 'SET_USER':
            return action.user
        default:
            return state
    }
}
 
let rootReducer = combineReducers({
    user: userRedux
})

export default createStore(rootReducer);
