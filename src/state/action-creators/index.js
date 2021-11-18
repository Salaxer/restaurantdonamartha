export const depositMoney = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'DEPOSIT',
            payload: amount
        })
    }
}
export const witdtrawMoney = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'WITHDRAW',
            payload: amount
        })
    }
}
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

export const getFood = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'GET',
            payload: amount
        })
    }
}
export const deleteFood = (amount) =>{
    return (dispatch) =>{
        dispatch({
            type: 'DELETE',
            payload: amount
        })
    }
}