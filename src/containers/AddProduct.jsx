import React ,{useRef, useState} from 'react';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions';
import API from '../utils/api';

const AddGarment = (props) => {
    const form = useRef(null);
    const [isAdd, setIsAdd] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const product = {
            'title': formData.get('title'),
            'description': formData.get('description'),
            'color': formData.get('color'),
            'category': formData.get('category'),
            'genre': formData.get('genre'),
            'price': formData.get('price'),
            'image': formData.get('image'),
            'type': formData.get('type')
        }

        fetch(`${API}/cloth/product`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.body)
            ocultForm()
        })
    }

    const ocultForm = () => {
        if (isAdd === true) {
            setIsAdd(false)   
        }else{
            setIsAdd(true)
        }
    }   
    

    return(
        <>
        <Helmet>
            <title>Agregar Producto</title>
        </Helmet>
        {props.token ?
            isAdd === true ? 
                <>
                    <h1>{message}</h1>
                    <button className="main-btn" onClick={ocultForm}>Agregar otro producto</button>
                    <br/>
                    <br/>
                    <Link to="/admin">Volver al panel de administracion</Link>
                </>
                :
                <>
                <h1>Agregar Producto</h1>
                <Link to="/admin">Volver</Link>
                <form className="form" ref={form}>
                    <input className="input" name="title" placeholder="Nombre" type="text"/>
                    <input className="input" name="description" placeholder="Descripcion" type="text"/>
                    <input className="input" name="color" placeholder="Color" type="text"/>
                    <input className="input" name="image" placeholder="Url de la imagen" type="text"/>
                    <br/>
                    <div className="form-group">
                        <label className="form-group__item">Categoria:
                            <select name="category" className="input form-group__item">
                                    <option value="1">Casual</option>
                                    <option value="2">Formal</option>
                                    <option value="3">Deporte</option>
                                    <option value="4">Hogar</option>
                            </select>
                        </label>
                        <label className="form-group__item">Genero
                            <select name="genre" className="input form-group__item">
                                <option value="0">Masculino</option>
                                <option value="1">Femenino</option>
                            </select>
                        </label>
                        <label className="form-group__item">Tipo
                            <select name="type" className="input form-group__item">
                                <option value="1">Prenda</option>
                                <option value="2">Calzado</option>
                                <option value="3">Accesorios</option>
                            </select>
                        </label>
                    </div>
                    <input className="input" name="price" placeholder="Precio" type="number"/>
                    <input className="input main-btn" type="submit" onClick={handleSubmit}/>
                </form>
                </>
                :
            history.push('/admin')
        }
        </>
    )
}

const mapStateToProps = ({ userReducers }) => {
    return userReducers
}

const mapDistatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDistatchToProps)(AddGarment);
