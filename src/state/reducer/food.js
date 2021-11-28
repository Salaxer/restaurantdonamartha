const reducer = (state = 'empty', action) =>{
    switch (action.type) {
        case "SET":
            return state = action.payload;   
        case "ADD":
            return state = state.concat(action.payload);            
        default:
            return state;
    }
}

export default reducer