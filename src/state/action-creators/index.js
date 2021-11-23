export const createUser = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'CREATE',
            payload: amount
        })
    }
}
export const deleteUser = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'DELETE',
            payload: amount
        })
    }
}

export const setFood = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'SET',
            payload: amount
        })
    }
}
export const addFood = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'ADD',
            payload: amount
        })
    }
}
export const saveConection = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'SAVECONECTION',
            payload: amount
        })
    }
}
export const deleteConection = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'DELETECONECTION',
            payload: amount
        })
    }
}
export const setOffer = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'NEWOFFER',
            payload: amount
        })
    }
}