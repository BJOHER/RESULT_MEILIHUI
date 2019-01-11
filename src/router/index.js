import React from 'react';
import App from '../App';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Home from '../views/index';
import Silo from '../views/silo/silo';
import Upcoming from '../views/upcoming/upcoming';
import Login from '../views/login/login';
import Productlist from '../views/productlist/productlist';
import Productdetail from '../views/productdetail/productdetail';
import Shoppingcart from '../views/shoppingcart/shoppingcart';
import {Provider} from 'react-redux';
import store from '../store';
const router = (
    <Provider store={store}>
    <Router>
        <App>
            <Switch>
                <Route path="/index" component={Home}/>
                <Route path="/silo/:englishname" component={Silo}/>
                <Route path="/upcoming" component={Upcoming}/>
                <Route path="/login" component={Login}/>
                <Route path="/productlist" component={Productlist}/>
                <Route path="/productdetail" component={Productdetail}/>
                <Route path="/shoppingcart" component={Shoppingcart}/>
                <Redirect from="*" to="/index"/>
            </Switch> 
        </App> 
    </Router>
    </Provider>
)

export default router;
