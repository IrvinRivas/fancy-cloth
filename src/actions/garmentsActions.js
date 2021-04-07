import types from '../types';
import API from '../utils/api';
import axios from 'axios';

const type = types.garmentTypes;

export const getAll = () => async(dispatch) => {
    dispatch({
        type: type.LOADING
    })
    try{
        const response = await axios.get(API+'/cloth');
        const garments = response.data.body;
        const responseStock = await axios.get(API+'/stock')
        const stock = responseStock.data.body;
        dispatch({
            type:type.GET_ALL,
            payload: {garments,stock}
        })
    }catch(error){
        console.log(error);
    }    
}