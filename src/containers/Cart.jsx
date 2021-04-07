import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import * as userActions from '../actions/userActions';
import * as garmentsActions from '../actions/garmentsActions';

import deleteIcon from '../images/delete.png'
import '../styles/Cart.css'

const cart = (props) => {

    const handleSum = () => {
        let total = 0;
        for (let i = 0; i < props.userReducers.cart.length; i++) {
            let multi =  props.userReducers.cart[i].price * props.userReducers.cart[i].amount; 
            total = multi + total;
        }
        return total
    }

    const removeToCart = (e) => {
        const index = e.target.id;
        let indexParset = parseInt(index);
        props.removeCart(indexParset)
    }
    
    return(
        <>
        <Helmet>
            <title>Tu Carrito de compras</title>
        </Helmet>
        {Object.keys(props.userReducers.cart).length === 0 ?
            <h1>Tu carrito esta vacio</h1>
            :
            <div className="cart-container">
                <div className="cart-hero">
                    <h1>Tu carrito</h1>
                    <h1>Total de tu compra: ${handleSum()}</h1>
                </div>
                {props.userReducers.cart.map((product, i) => (
                    <div className="cart-product" key={product.id}>
                        <img 
                            src={product.image}
                            className="cart-image" 
                            alt={product.title}
                        />
                        
                        <div className="product-info">
                            <div className="product-title">
                                <h2>{product.name}</h2>
                                <img 
                                    className="product-delete__icon" 
                                    id ={i} 
                                    onClick={removeToCart} 
                                    src={deleteIcon} 
                                    alt="delete"
                                />
                            </div>
                            <p><strong>talla: </strong> {product.size}</p>
                            <p><strong>cantidad: </strong> {product.amount}</p>
                            <p><strong>Precio: </strong> ${product.price}</p>
                            <p><strong>Monto: </strong> ${product.price * product.amount}</p>
                        </div>
                    </div> 
                ))}
                <Link to="/payment">
                    <button className="main-btn">Pagar</button>
                </Link>
            </div>
        }
        </>
    )
}

const mapStateToProps = ({ userReducers, garmentReducers }) => {
    return {
        userReducers,
        garmentReducers
    }
}

const mapDispatchToProps = {
    ...userActions,
    ...garmentsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(cart);