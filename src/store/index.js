import {createStore,combineReducers} from 'redux';
import cmslistReducer from './Reducers/cmslistReducer';
import {applyMiddleware} from 'redux'; 
import promisethunk from 'redux-promise';
const reducer = combineReducers({
    cmslistReducer,
})
const store = createStore(reducer,applyMiddleware(promisethunk));
export default store;