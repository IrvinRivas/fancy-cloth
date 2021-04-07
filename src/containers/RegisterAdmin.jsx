import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import API from '../utils/api';

const RegisterAdmin = () => {

    const form = useRef(null);
    const history = useHistory(null);

    const handleSumbit = (e) => {
        const formdata =  new FormData(form.current);
        e.preventDefault();
        const data = {
            'user': formdata.get('user'),
            'password': formdata.get('password')
        }
        fetch(API+'/users/admin/register',{
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
            history.push('/admin')
        })
    }

    return (
        <div>
            <h1>registrar un administrador</h1>
            <form ref={form} className="form" >
                <input name="user" type="text" className="input"/>
                <input name="password" type="password" className="input"/>

                <input type="submit" onClick={handleSumbit} className="main-btn input"/>
            </form>  
        </div>
    )
}

export default RegisterAdmin