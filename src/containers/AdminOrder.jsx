import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { connect } from 'react-redux';
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions';
import Spinner from '../components/Spinner';

const AdminOrder = (props) =>{
    const order = props.match.params.order;
    const form = useRef(null);
    const [product,setProducts] = useState([]);
    const [dataInfo, setDataInfo] = useState([]);
    const [isSearched, setSearched] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [message, setMessage] = useState('');

    const getProductsOfTheOrder = () => {
        fetch(API+'/orders/order/'+order)
            .then(response => response.json())
            .then(data => {
                setDataInfo(data.body[0])
                setSearched(true);
            })
    }

    const getData = () => {
        fetch(API+'/orders/products/'+order)
            .then(response => response.json())
            .then(data => {
                setProducts(data.body)
                getProductsOfTheOrder()
            })
    }

    useEffect(() => {
        getData()
        console.log(props);
    },[])

    const searchProduct = (id) => {
        let product = props.garmentReducers.garments.filter(product => product.id === id);
        return product[0]
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formdata =  new FormData(form.current);

        const data = {
            'status': formdata.get('status'),
            'guide': formdata.get('guide'),
            'parcel': formdata.get('parcel'),
        }
        const token = props.userReducers.token;

        fetch(API+'/orders/update/'+order, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({
                data
            })
        })
            .then(response => response.json())
            .then(data => {
                setIsUpdate(true);
                setMessage(data.body)
            })
    }

    return (
        <div className="admin-order">
            {isUpdate ?
                <> 
                    <h1>{message}</h1>
                    <Link to="/admin/order-panel">Volver</Link>
                </>
                :
                <>
                {product.length > 0 ? 
                <>
                 <h1>Pedido: {order}</h1>
                    {product.map(product => (
                        <div className="order" key={product.id_product}>
                            <p><strong>Producto: </strong>{searchProduct(product.id_product).title}</p>
                            <p><strong>Precio: </strong>${searchProduct(product.id_product).price}</p>
                            <p><strong>Cantidad: </strong>{product.amount}</p>
                            <p><strong>Talla: </strong>{product.size}</p>
                        </div>
                    ))}
                </>
                    :
                    <Spinner/>
                }
                <h1>Informacion del pedido</h1>
                <p><strong>Estado: </strong>{dataInfo.status}</p>
                {dataInfo.parcel !== 'none' && dataInfo.guide > 0 &&
                    <>
                        <p><strong>Paqueteria: </strong>{dataInfo.parcel}</p>
                        <p><strong>Guia: </strong>{dataInfo.guide}</p>
                    </>
                }
                <form ref={form} className="form">
                    <div className="form-group">
                            {dataInfo.parcel !== 'none' && dataInfo.guide > 0 && isSearched === true ?
                            <>
                                <select name="status" className="input select form-group__item">
                                    <option value="enviado">Enviado</option>
                                    <option value="entregado">Entregado</option>
                                </select>
                                <input name="guide" className="input form-group__item onlyRead" defaultValue={dataInfo.guide > 0 ? dataInfo.guide : false} placeholder="Numero de guia" type="number"/>
                                <input name="parcel" className="input form-group__item onlyRead" defaultValue={dataInfo.parcel !== 'none' ? dataInfo.parcel : '' } placeholder="Paqueteria" type="text"/>
                            </>
                                :
                            <>
                                <select name="status" className="input select form-group__item">
                                    <option value="enviado">Enviado</option>
                                    <option value="entregado">Entregado</option>
                                </select>
                                <input name="guide" className="input form-group__item" placeholder="Numero de guia" type="number"/>
                                <input name="parcel" className="input form-group__item" placeholder="Paqueteria" type="text"/>
                            </>
                            }
                    </div>
                    <input type="submit" className="main-btn" onClick={handleSubmit} />
                </form>
            </>
            }
        </div>
    )
}

const mapStateToProps = ({ garmentReducers, userReducers }) => {
    return {
        garmentReducers,
        userReducers
    };
}

const mapDispatchToProps = {
    ...garmentsActions,
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminOrder); 
