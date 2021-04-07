import { combineReducers } from 'redux';
import garmentReducers from './garmentReducers';
import userReducers from './userReducers'

export default combineReducers({
    garmentReducers,
    userReducers
})