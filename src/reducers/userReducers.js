import types from '../types/index';
const type = types.userTypes;

const INITIAL_STATE = {
    isLogged: false,
    cart:{},
    user:[],
    token: ""
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case type.LOGIN:
            return {...state, user: action.payload.user, isLogged: true}
        
            case type.LOGOUT:
                return {...state, user: [], isLogged: false}

        case type.ADD_CART:
            return {...state ,cart:action.payload.cart}
        
        case type.REMOVE_CART:
            return {...state, 
                cart: state.cart.filter((product, i) => i !== action.payload.index) 
            }

        case type.RESET_CART:
            return {...state, cart: {}}

        case type.LOGIN_ADMIN:
            return {...state, token: action.payload.token}

        default: return state;
    }
}