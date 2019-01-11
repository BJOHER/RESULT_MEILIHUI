import {createStore,combineReducers} from 'redux';
import cmslistReducer from './Reducers/cmslistReducer';
import {applyMiddleware} from 'redux'; 
import promisethunk from 'redux-promise';
import productslistReducer from './Reducers/productslistReducer'

const reducer = combineReducers({
    cmslistReducer,
    productslistReducer
})
const store = createStore(reducer,applyMiddleware(promisethunk));
export default store;