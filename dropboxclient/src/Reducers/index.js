/**
 * Created by ManaliJain on 9/30/17.
 */

import {combineReducers} from 'redux';
import loginStateReducer from './loginStateReducer';
import loginDataReducer from './loginDataReducer';
import userMenuReducer from './userMenuReducer';
import userFilesReducer from './userFilesReducer';

const allReducers = combineReducers({
    loginState: loginStateReducer,
    userMenu: userMenuReducer,
    loginData: loginDataReducer,
    interestUpdate: loginDataReducer,
    aboutUpdate: loginDataReducer,
    userFiles: userFilesReducer

});

export default allReducers;