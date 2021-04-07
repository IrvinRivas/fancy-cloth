import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import API from '../utils/api';
import { connect } from 'react-redux';
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions'
import '../styles/Order.css';

const Order = (props) => {
    const order = props.match.params.order;
    const [product, setProducts] = useState([]);
    const history = useHistory(null)

    useEffect(() => {
        fetch(API+'/orders/products/'+order)
            .then(response => response.json())
            .then(data => {
                setProducts(data.body)
            })
            console.log(props);
    },[])

    const searchProduct = (id) => {
        let product = props.garmentReducers.garments.filter(product => product.id === id);
        return product[0]
    }

    return (
        <>
        {props.userReducers.isLogged ? 
            <div className="order-container">
                <div>
                    <h1>Pedido: {order}</h1>
                    <Link to="/my-orders">Volver</Link>
                    <h3>Productos comprados:</h3>
                    {product.map((product, i) => (
                        <div className="order" key={product.id_product}>
                            <p><strong>Producto: </strong>{searchProduct(product.id_product).title}</p>
                            <p><strong>Precio: </strong>${searchProduct(product.id_product).price}</p>
                            <p><strong>Cantidad: </strong>{product.amount}</p>
                            <p><strong>Talla: </strong>{product.size}</p>
                        </div>
                    ))}
                </div>
            </div>
            :
                history.push('/')
        }
        </>
    )
}

const mapStateToProps = ({ garmentReducers, userReducers }) => {
    return {
        garmentReducers,
        userReducers
    }
}

const mapDispatchToProps = {
    ...garmentsActions,
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);
