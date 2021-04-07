import React,{useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as garmentsActions from '../actions/garmentsActions';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import Home from '../containers/Home';
import Product from '../containers/Product';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Cart from '../containers/Cart';
import Search from '../containers/Search';
import Payment from '../containers/Payment';
import Success from '../containers/Success';
import MyAcount from '../containers/MyAcount';
import MyOrders from '../containers/MyOrders';
import UpdateMyAddress from '../containers/UpdateMyAddress';
import Order from '../containers/Order';

import Admin from '../containers/Admin';
import AddProduct from '../containers/AddProduct';
import OrderPanel from '../containers/OrderPanel';
import AdminOrder from '../containers/AdminOrder';
import AdminAnalitycts from '../containers/AdminAnalitycts';
import AdminInventory from '../containers/AdminInventory';
import RegisterAdmin from '../containers/RegisterAdmin';
import UpdateInventary from '../containers/UpdateInventary';


 const App = (props) => {
    useEffect(() => {
        if (!props.garments) {
            props.getAll()   
        }
    },[])
    return(
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path='/registrar' component={Register}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/search/:product/:genre/:min/:max' component={Search}/>
                    <Route exact path='/producto/:id' component={Product}/>
                    <Route exact path='/payment' component={Payment} />
                    <Route exact path='/success' component={Success} />
                    <Route exact path='/my-acount' component={MyAcount} />
                    <Route exact path='/my-orders' component={MyOrders} />
                    <Route exact path='/order/:order' component={Order} />
                    <Route exact path='/update-my-address' component={UpdateMyAddress} />

                    <Route exact path='/admin' component={Admin}/>
                    <Route exact path='/admin/add-product' component={AddProduct}/>
                    <Route exact path='/admin/analitycs' component={AdminAnalitycts}/>
                    <Route exact path='/admin/order-panel' component={OrderPanel}/>
                    <Route exact path='/admin/inventory/' component={AdminInventory}/>
                    <Route exact path='/admin/inventory/update/:product/:size/:amount' component={UpdateInventary}/>
                    <Route exact path='/admin/order-panel/order/:order' component={AdminOrder}/>
                    <Route exact path='/admin/register' component={RegisterAdmin}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    )
    
 }

const mapStateToProps = ( garmentsReducers ) => {
    return garmentsReducers
}

const mapDispatchToProps = {
    ...garmentsActions
}

export default connect(mapStateToProps,mapDispatchToProps)(App);