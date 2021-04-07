import types from '../types/index';
const type = types.garmentTypes

const INITIAL_STATE = {
    garments: [],
    stock: [],
    loading:false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case type.GET_ALL:
            return {...state, garments:action.payload.garments,stock:action.payload.stock, loading: false}

        case type.LOADING:
            return {...state, loading: true}

        default: return state;
    }
}