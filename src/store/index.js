import {createStore,combineReducers} from 'redux';
import cmslistReducer from './Reducers/cmslistReducer';
import {applyMiddleware} from 'redux'; 
import promisethunk from 'redux-promise';
import productslistReducer from './Reducers/productslistReducer'
import shopcartReducer from "./Reducers/shopcartReducer"

const reducer = combineReducers({
    cmslistReducer,
    productslistReducer,
    shopcartReducer
})
const store = createStore(reducer,applyMiddleware(promisethunk));
export default store;