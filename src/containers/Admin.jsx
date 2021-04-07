import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import tShirt from '../images/t-shirt.png';
import shoe from '../images/shoe.png';
import collar from '../images/collar.png';
import orders from '../images/orders.png';
import analitycs from '../images/analitics.png';
import inventory from '../images/inventory.png';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

import '../styles/Admin.css'
import LoginAdmin from './LoginAdmin';

const Admin = (props) => {
    
    return(
        <>
        <Helmet>
            <title>Fancy cloth: admin</title>
        </Helmet>
        {props.token ?
            <div className="admin-dashboard">
                <Link to="/admin/add-product" className="admin-item">
                    <h1>Agregar Producto</h1>
                    <div className="item-images__container">
                        <img src={tShirt} className="admin-item__image" alt=""/>
                        <img src={shoe} className="admin-item__image" alt=""/>
                        <img src={collar} className="admin-item__image" alt=""/> 
                    </div>
                </Link>
            
                <Link to="/admin/order-panel" className="admin-item">
                    <h1>Panel de pedidos</h1>
                    <div className="item-images__container">
                        <img src={orders} className="admin-item__image" alt=""/>  
                    </div>
                </Link>

                <Link to="/admin/analitycs" className="admin-item">
                    <h1>Analitica de ventas</h1>
                    <div className="item-images__containers">
                        <img src={analitycs} alt="" className="admin-item__image"/>
                    </div>
                </Link>

                <Link to="/admin/inventory" className="admin-item">
                    <h1>Invetario</h1>
                    <div className="item_images__container">
                        <img src={inventory} alt="" className="admin-item__image"/>
                    </div>
                </Link>
            </div>
            :
            <LoginAdmin/>
        }
        </>
    )
}

const mapStateToProps = ({ userReducers }) => {
    return userReducers
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
