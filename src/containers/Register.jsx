import React, {useRef, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import API from '../utils/api';
import '../styles/Register.css'

const Register = () => {
    const form = useRef(null);
    const [message, setMessage] = useState('');
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const user = {
            'name': formData.get('name'),
            'phone': formData.get('phone'),
            'email': formData.get('email'),
            'password': formData.get('password'),
            'country': formData.get('country'),
            'state': formData.get('state'),
            'city': formData.get('city'),
            'address': formData.get('address'),
            'cp': formData.get('cp'),
        }

        if (formData.get('password') === formData.get('password2')) {
            fetch(API+'/users/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 500) {
                    setMessage(data.body)
                }else{
                    history.push('/login')
                }
            })
        }else{
            setMessage('Las contraseñas no coinciden')
        }
        

    }

    return(
        <>
        <Helmet>
            <title>Registrarte</title>
        </Helmet>
        <h1>Registrate para poder comprar</h1>
        <Link to="/login">Ya tengo Cuenta</Link>
        <h1>{message}</h1>
        <form className="form" ref={form}>
            <input name="name" placeholder="Nombre" type="text" className="input"/>
            <input name="phone" placeholder="Celular" type="phone" className="input"/>
            <input name="email" placeholder="Email" type="email" className="input"/>
            <input name="password" placeholder="Contraseña" type="password" className="input"/>
            <input name="password2" placeholder="Repite tu contraseña" type="password" className="input"/>
            <div className="form-group">
                <input name="country" placeholder="Pais" type="text" className="input form-group__item"/>
                <input name="state" placeholder="Estado" type="text" className="input form-group__item"/>
                <input name="city" placeholder="Ciudad" type="text" className="input form-group__item"/>
            </div>
            <div className="form-group">
                <input name="address" placeholder="Direccion (una sola linea)" type="text" className="input input form-group__item"/>
                <input name="cp" placeholder="Codigo postal" type="number" className="input input form-group__min-item"/>
            </div>
            <input type="submit" className="input main-btn" onClick={handleSubmit}/>
        </form>
        </>
    )
}

export default Register
