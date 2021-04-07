import types from '../types';
const type = types.userTypes;

export const logged = (user) => (dispatch) => {
    dispatch({
        type: type.LOGIN,
        payload:{user}
    })
}

export const logout = () => (dispatch) => {
    dispatch({
        type: type.LOGOUT
    })
}

export const addCart = (cart) => (dispatch) => {
    dispatch({
        type: type.ADD_CART,
        payload:{cart}
    })
}

export const removeCart = (index) => (dispatch) => {
    dispatch({
        type: type.REMOVE_CART,
        payload: {index}
    })
}

export const resetCart = () => (dispatch) => {
    dispatch({
        type: type.RESET_CART
    })
}

export const loginAdmin = (token) => (dispatch) => {
    dispatch({
        type: type.LOGIN_ADMIN,
        payload: {token}
    })
}