import React, {useRef} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const Login = (props) => {
    let history = useHistory(null)
    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata =  new FormData(form.current);
        const data = {
            'email': formdata.get('email'),
            'password': formdata.get('password'),
        }
        fetch(API+'/users/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error === false) {
                props.logged(data.body)
                history.push('/')
            }
        })
    }

    return(
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="login-container">
            <h1>Inicia sesion</h1>
            <form className="form" ref={form}>
                <input name="email" type="email" className="input"/>
                <input name="password" type="password" className="input"/>
                <input type="submit" onClick={handleSubmit} className="input main-btn"/>
            </form>
            <div className="form-group">
                <p>¿No tiene una cuenta?</p>
                <Link to="/registrar">Registrate aqui</Link>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);