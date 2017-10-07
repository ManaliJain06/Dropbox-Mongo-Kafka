/**
 * Created by ManaliJain on 9/30/17.
 */

import {combineReducers} from 'redux';
import loginStateReducer from './loginStateReducer';
import loginDataReducer from './loginDataReducer';
import userMenuReducer from './userMenuReducer';

const allReducers = combineReducers({
    loginState: loginStateReducer,
    userMenu: userMenuReducer,
    loginData: loginDataReducer,
    interestUpdate: loginDataReducer,
    aboutUpdate: loginDataReducer

});

export default allReducers;