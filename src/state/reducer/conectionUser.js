const userReducer = (state = 'loading', action) =>{
    switch (action.type) {
        case "SAVECONECTION":
            return state = action.payload;            
        case "DELETECONECTION": 
            return null;
        default:
            return state;
    }
}

export default userReducer