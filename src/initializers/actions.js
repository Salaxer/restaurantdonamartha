export const saveToken = (token) =>{
    return{
        type: 'SET_TOKEN',
        token
    }
}

export const saveUser = (user) =>{
    return{
        type: 'SET_USER',
        user
    }
}