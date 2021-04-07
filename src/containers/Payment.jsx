import React from 'react';
import { PayPalButton } from 'react-paypal-button'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet'
import * as userActions from '../actions/userActions';
import API from '../utils/api';
import '../styles/Payment.css';

const Payment = (props) => {
    const user = props.user;
    const history = useHistory(null);

    const handleSum = () => {
        let total = 0;
        for (let i = 0; i < props.cart.length; i++) {
            let multi =  props.cart[i].price * props.cart[i].amount; 
            total = multi + total;
        }
        return total
    }

    const handlePayment = (paymentData) => {
        if (paymentData.status === 'COMPLETED') {
            const data = {
                user: user.id,
                email: user.email,
                address: `${user.address},${user.city},${user.state},${user.country}`,
                amount: handleSum(),
                status: 'pendiente',
                cp: user.cp,
                parcel: 'none',
                guide: 0
            }
            let products = []
    
            props.cart.map(product => (
                products.push({
                    id_product: product.product,
                    id_order: "",
                    amount: product.amount,
                    size: product.size,
                })
            ))
    
            fetch(API+'/orders',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data,
                    products
    
                })
            })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    history.push('/success')
                }
            })
        }
    }

    const paypalOptions = {
        clientId : 'AX7KPhGLpsWJJLwVi-EBCfDEp7P-O1GqVB70uuYhXN-MQoEXafaZa2ihcKMSsUk5trJS7lvTlGfvUPsq',
        intent: 'capture',
        currency: 'USD'
      }
     
      const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
      }
    
    return(
        <>
        <Helmet>
            <title>Paga Tu pedido y recibe lo mas pronto posible</title>
        </Helmet>
        <div className="Payment-container">
            <div className="payment-hero">
                <h1>Enviar pedido a:</h1>
                <p><strong>Direccion: </strong>{user.address}</p>
                <p><strong>Ciudad: </strong>{user.city}</p>
                <p><strong>Estado: </strong>{user.state}</p>
                <p><strong>Pais: </strong>{user.country}</p>
                <p><strong>CP: </strong>{user.cp}</p>
            </div>
            <div>
                <h1>Resumen de compra</h1>
                {props.cart.map(product => (
                    <div className="payment-item" key={product.id}>
                        <h3>{product.name}</h3>
                        <div className="payment-details">
                            <p><strong>Talla: </strong>{product.size}</p>
                            <p><strong>Cantidad:</strong>{product.amount}</p>
                            <p><strong>Precio:</strong> ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="payment-btn">
                <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={handleSum()}
                    onPaymentStart={() => console.log('start')}
                    onPaymentSuccess={handlePayment}
                    onPaymentCancel={() => console.log('cancel')}
                />
            </div>
        </div>
        </>
    )
}

const mapStateToProps = ({ userReducers }) => {
    return userReducers
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment);
