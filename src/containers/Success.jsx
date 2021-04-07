import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as userActions from '../actions/userActions';

import '../styles/Success.css';

const Success = (props) => {

        useEffect(() => {
            props.resetCart()
        },[])
    return (
        <>
        <Helmet>
            <title>Compra exitosa</title>
        </Helmet>
        <div className="Sucess-hero">
            <h1>¡Felicidades por tu compra!</h1>
            <p>Recibiras tu pedido en un lapso de 3 a 5 dias habiles (de lunes a viernes exeptuando dias festivos)</p>
            <Link to="/">Click aqui para volver al home</Link>
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

export default connect(mapStateToProps,mapDispatchToProps)(Success);

