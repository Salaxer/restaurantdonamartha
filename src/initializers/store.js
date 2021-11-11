import { createStore, combineReducers } from "redux";

const tokenRedux = (state = '', action) =>{
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token
        default:
            return state
    }
}
const userRedux = (state = '', action) =>{
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token
        default:
            return state
    }
}

let rootReducer = combineReducers({
    token: tokenRedux
})

export default createStore(rootReducer);
