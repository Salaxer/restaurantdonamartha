const reducer = (state = 'empty', action) =>{
    switch (action.type) {
        case "GET":
            return state = action.payload;            
        default:
            return state;
    }
}

export default reducer