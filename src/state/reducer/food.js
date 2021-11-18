const reducer = (state = 'empty', action) =>{
    switch (action.type) {
        case "GET":
            return state = action.payload;            
        case "DELETE": 
            return null;
        default:
            return state;
    }
}

export default reducer