const reducer = (state = 0, action) =>{
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload;            
        case "WITHDARW": 
            return state - action.payload;
        default:
            return state;
    }
}

export default reducer