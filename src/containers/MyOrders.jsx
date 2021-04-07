import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as userActions from '../actions/userActions';
import Spinner from '../components/Spinner';
import API from '../utils/api';
import '../styles/Orders.css'

const MyOrders = (props) =>  {
    const [isSought,setSought] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        fetch(API+'/orders/'+props.user.id)
            .then(response => response.json())
            .then(data => {
                setOrders(data.body)
                setSought(true)
            })
    },[])
    return (
        <>
        <Helmet>
            <title>Mis Compras</title>
        </Helmet>
        {isSought ? 
            <div className="myOrders">
                <>
                {orders.length > 0 ?
                    <>
                    <h1>Mis pedidos</h1>
                    <Link to="/my-acount">Volver</Link>
                    {orders.map(order => (
                        <div className="order-item">
                            <Link to={"/order/"+order.id}>
                                <h1>orden: {order.id}</h1>
                                <p>Monto: ${order.amount}</p>
                                <p>Fecha: {order.date.slice(0,10)}</p>
                                <p>Estado: {order.status}</p>
                                {order.status !== 'pendiente' &&
                                    <>
                                    <p>Paqueteria: {order.parcel}</p>
                                    <p>Guia: {order.guide}</p>
                                    </>
                                }
                            </Link>
                        </div>
                    ))}
                    </>
                    
                    :
                    <h1>No has realizado ningun pedido</h1>
                }
                </>
            </div>
            :
            <Spinner/>
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

export default connect(mapStateToProps,mapDispatchToProps)(MyOrders);
