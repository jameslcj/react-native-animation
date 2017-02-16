

import {createStore,combineReducers,applyMiddleware} from 'redux';

import {calculate, myReducer, myReducer2} from './reducer';//导入所有的reducer


const rootReducer=combineReducers({
    calculate,
    myReducer,
    myReducer2,
    // navigator,
    // tab,
    // user,
});

let store =createStore(rootReducer);

export const getStore=()=>{
    return store;
}

