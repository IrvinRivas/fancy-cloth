import React, { useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const UpdateMyAcount = (props) => {
    const form = useRef(null);
    const [message,setMessage] = useState('')
    const [isUpdated, setUpdated] = useState(false)
    const history = useHistory(null)

    const HandleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const id = props.user.id; 
        const user = {
            'phone': formData.get('phone'),
            'country': formData.get('country'),
            'state': formData.get('state'),
            'city': formData.get('city'),
            'address': formData.get('address'),
            'cp': formData.get('cp'),
        }

        fetch(API+'/users/update',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                user
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.body);
            setUpdated(true)
        })
    }
    return (
        <>
        {props.isLogged ? 
        <>
            <Helmet>
                <title>Actualizar mis datos</title>
            </Helmet>
            {isUpdated ?
                <>
                    <h1>{message}</h1>
                    <Link to="/my-acount">Volver</Link>
                </>
                :
                <div className="updateAcount">
                    <h1>Actualizar mis datos</h1>
                    <form ref={form} className="form">
                        <input name="address" defaultValue={props.user.address} className="input" type="text"/>
                        <input name="city" defaultValue={props.user.city} className="input" type="text"/>
                        <input name="state" defaultValue={props.user.state} className="input" type="text"/>
                        <input name="country" defaultValue={props.user.country} className="input" type="text"/>
                        <input name="cp" defaultValue={props.user.cp} className="input" type="text"/>
                        <input name="phone" defaultValue={props.user.phone} className="input" type="text"/>
                        <input type="submit" className="input main-btn" onClick={HandleSubmit}/>
                    </form>
                </div>
            }
            </>
            :
            history.push('/')
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

export default connect(mapStateToProps,mapDispatchToProps)(UpdateMyAcount)
