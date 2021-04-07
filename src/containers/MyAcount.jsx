import React from 'react';
import { connect } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import * as userActions from '../actions/userActions';
import Helmet from 'react-helmet'

import '../styles/MyAcount.css';
import rigth from '../images/rigth-arrow.png'

const MyAcount = (props) => {
    const address = `${props.user.address}, ${props.user.cp} ,${props.user.city}, ${props.user.state}, ${props.user.country}`;
    let history = useHistory(null);
    const logout = () => {
        props.logout()
        history.push('/')
    }

    return (
        <>
        {props.isLogged ? 
        <>
            <Helmet>
                <title>Mi Cuenta</title>
            </Helmet>
            <div className="myAcout">
                <h1>{props.user.name}</h1>
                <p><strong>Direccion: </strong>{address}</p>
                <p><strong>Email: </strong>{props.user.email}</p>
                <div className="myAcount-options">
                    <h2>¿Que deseas hacer?</h2>
                    
                    <Link to="/my-orders">
                        <div className="myAcount-options__item">
                            <p>Ver mis Compras</p>
                            <img className="myAcount-options__img" src={rigth} alt="flecha ala derecha"/>
                        </div>
                    </Link>

                    <Link to="/update-my-address">
                        <div className="myAcount-options__item">
                            <p>Actualizar mi direccion de envio</p>
                            <img className="myAcount-options__img" src={rigth} alt="flecha ala derecha"/>
                        </div>
                    </Link>
                    <div className="myAcount-options__item" onClick={logout}>
                            <p>Cerrar sesion</p>
                            <img className="myAcount-options__img" src={rigth} alt="flecha ala derecha"/>
                    </div>
                </div>
            </div>
            </>
            :
            history.push('/')
        }
        </>
    )
}

const mapStateToProps = ({userReducers}) => {
    return userReducers;
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(MyAcount);
