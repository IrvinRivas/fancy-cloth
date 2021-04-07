import React,{useRef, useState} from 'react';
import Helmet from 'react-helmet';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const UpdateInventary = (props) => {

    const { product } = useParams();
    const { size } = useParams();
    const { amount } = useParams();
    const form = useRef(null);
    const [message, setMessage] = useState('');
    const history = useHistory(null)
    const token = props.userReducers.token;

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);

        const data = {
            'product': product,
            'size': size,
            'amount': formData.get('amount')
        }
        
        fetch(API+'/stock',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({
                data,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    setMessage(data.body)
                }
            })

    }

    const searchProduct = (id) => {
        let product = props.garmentReducers.garments.filter(product => product.id === id);
        return product[0]
    }

    return (
        <>
        {token ? 
        <>
            <Helmet>
                <title>Actualizar producto</title>
            </Helmet>
            <div>
                {message ? 
                    <>
                        <h1>{message}</h1>
                        <Link to="/admin/inventory">Volver</Link>
                    </>
                    :
                    <>
                        <h1>Actualizar Inventario</h1>  
                        <h2>{searchProduct(product).title}</h2>
                        <p><strong>Talla: </strong>{size}</p>
                        <p><strong>Cantidad anterior: </strong>{amount}</p>
                        <form ref={form} className="form">
                            <input type="number" className="input" name="amount"/>
                            <input type="submit" className="input main-btn" onClick={handleSubmit}/>
                        </form>
                    </>
                }
            </div>
        </>
        :
            history.push('/admin')
        
        }
        </>
    )
}

const mapStateToProps = ({ garmentReducers, userReducers }) => {
    return {
        garmentReducers,
        userReducers
    }
}

const mapDispatchToProps = {
    ...garmentsActions,
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateInventary)
