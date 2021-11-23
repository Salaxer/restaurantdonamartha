const reducer = (state = 'empty', action) =>{
    switch (action.type) {
        case "NEWOFFER":
            return state = action.payload;            
        default:
            return state;
    }
}

export default reducer