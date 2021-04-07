import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const OrderPanel = (props) => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState([]);
    const form = useRef(null);
    let status = 'pendiente';
    const history = useHistory(null);

    useEffect(() => {
        fetch(API+'/orders/status/'+status)
            .then(response => response.json())
            .then(data => {
                setOrders(data.body)
                setMessage('')
            })
    },[])

    const filterOrders = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        let initial = formData.get('initial');
        let final = formData.get('final');
        let status = formData.get('status');

        fetch(`${API}/orders/filter/${initial}/${final}/${status}`)
            .then(response => response.json())
            .then(data => {
                if (data.error === false) {
                    setOrders(data.body)
                    setMessage('')
                }else{
                    setMessage(data.body)
                    setOrders([])
                }
            })
    }
    return (
        <>
        {props.userReducers.token ? 
            <>
            <Helmet>
                <title>Panel de pedidos</title>
            </Helmet>
            <div className="order-panel">
                <h1>Panel de pedidos</h1>
                <Link to="/admin">Volver</Link>
                <h3>Selecciona de que fechas deseas ver los pedidos</h3>
                <form ref={form} className="form">
                    <div className="form-group">
                        <input name="initial" type="date" className="input form-group__item"/>
                        <input name="final" type="date" className="input form-group__item"/>
                        <select name="status" className="input form-group__item select" >
                            <option value="pendiente">Pendiente</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregado">Entregado</option>
                        </select>
                    </div>
                    <input type="submit" onClick={filterOrders} className="main-btn"/>
                </form>
    
                {message !== '' && <h1>{message}</h1>}
    
                {orders.length > 0 &&
                    <div className="orders">
                        {orders.map((order) => (
                            <div className="order-item" key={order.id}>
                                <Link to={"/admin/order-panel/order/"+order.id}>
                                    <h3>{order.id}</h3>
                                    <h5>{order.email}</h5>
                                    <p>{order.address}</p>
                                    <p>{order.status}</p>
                                    <p>{order.date.slice(0,10)}</p>
                                    <p>{order.date.slice(11,19)}</p>
                                    <p>{order.amount}</p>
                                    {order.parcel !== 'none' && <p>{order.parcel}</p>}
                                    {order.guide > 0 && <p>{order.guide}</p>}
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
            </>
            :
            history.push('/admin')
        }
        </>
    )
}

const mapStateToProps = ( userReducers) => {
    return userReducers
}

const mapDispatch = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatch)(OrderPanel);