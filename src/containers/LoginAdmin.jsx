import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const LoginAdmin = (props) => {

    const form = useRef(null);
    const [message, setMessage] = useState('')

    const handleSumbit = (e) => {
        const formdata =  new FormData(form.current);
        e.preventDefault();
        const data = {
            'user': formdata.get('user'),
            'password': formdata.get('password')
        }
        fetch(API+'/users/admin/login',{
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
            if (data.status !== 200) {
                setMessage(data.body)
            }else{
                props.loginAdmin(data.body[1])
            }
        })
    }

    return (
        <div>
            <h1>{message ? message : 'Login de administrador'}</h1>
            <form ref={form} className="form" >
                <input name="user" type="text" className="input"/>
                <input name="password" type="password" className="input"/>

                <input type="submit" onClick={handleSumbit} className="main-btn input"/>
            </form>   
            <Link to="/admin/register">
                registrar
            </Link>
        </div>
    )
}

const mapStateToProps = ({ userReducers }) => {
    return userReducers
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginAdmin)
