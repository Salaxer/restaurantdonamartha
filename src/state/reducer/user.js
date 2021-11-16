const userReducer = (state = 'loading', action) =>{
    switch (action.type) {
        case "CREATE":
            return state = action.payload;            
        case "DELETE": 
            return null;
        default:
            return state;
    }
}

export default userReducer