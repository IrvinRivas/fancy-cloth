import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions';
import Spinner from '../components/Spinner';

import '../styles/Product.css';

const Product = (props) => {
    const category = ['Casual','Formal','Deportivo','Hogar'];
    const [count,setCount] = useState(0);
    const [size, setSize] = useState('');
    const [message, setMessage] = useState('');
    const productParam = props.match.params.id;
    let sizes = []

    const getSizes = (id) => {
        let sizes = props.garmentReducers.stock.filter(stock => stock.product === id && stock.amount > 0)
        let NewSizes = sizes.map(size => size.size)
        return NewSizes.sort((a,b) => a - b)
    }

    const searchProduct = () => {
        return props.garmentReducers.garments.filter(garment => garment.id === productParam)
    }
    
    const product = useMemo(() => {
        return searchProduct()[0]
    },[props.garmentReducers.garments, props.getAllGarments])

    if (product) {
        sizes = getSizes(product.id)   
    }

    const sumCount = () => {
        setCount(count + 1)
    }

    const resCount = () => {
        if (count !==0) {
            setCount(count - 1) 
        }
    }

    const handleSelectSize = (e) => {
        const buttons = document.getElementsByClassName('product-size__button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('product-size-selected')
        }
        const size = e.target.innerHTML;
        const sizeButton = e.target;
        sizeButton.classList.add('product-size-selected')
        setSize(size)

        
    }

    const addToCart = () => {
        if (count === 0) {
            setMessage('porfavor agrega una cantidad')
            return false
        }
        if (size === '') {
            setMessage('porfavor selecciona una talla')
            return false
        }
        const newProduct = {
            product: product.id,
            name: product.title,
            size,
            amount: count,
            price: product.price,
            image: product.image
        }
        const cart = props.userReducers.cart;

        if (Object.keys(cart).length === 0) {
            const newCart = [newProduct]
            props.addCart(newCart)
        }else{
            const newCart = [...cart,newProduct]
            props.addCart(newCart)
        }
        setMessage('Añadido correctamente')
    }
return(
    <>
    {props.garmentReducers.garments.length > 0 ?
        <>
        <Helmet>
            <title>{product.title}</title>
        </Helmet>
        <div className="product"> 
            <div className="product-hero">
                <div>
                    <h2 className="product-title">{product.title}</h2>
                    <img src={product.image} alt="" className="product-image"/>
                </div>
                <div className="product-data">
                    <p>{product.description}</p>
                    <p><strong>Ideal para un evento : </strong>{category[product.category - 1]}</p>
                    <p><strong>Color: </strong>{product.color}</p>
                    <strong><p>${product.price}</p></strong>
                    {sizes.length > 0 ? 
                    <div>
                        <h3>Talla:</h3>
                        <div className="product-size">
                            
                            {sizes.map((size,i) => (
                                <p onClick={handleSelectSize} key={i} className="product-size__button">{size}</p>
                            ))}
                        </div>
                        <div className="product-counter">
                            <h3>Agregar al carrito:</h3>
                            <p onClick={resCount} className="product-counter__button" >-</p>
                            <p>{count}</p>
                            <p onClick={sumCount} className="product-counter__button">+</p>
                        </div>
                        <button onClick={addToCart} className="main-btn">Agregar</button>
                        <p>{message}</p>
                    </div>
                        :
                    <h1>Producto no disponible</h1>
                    }
                </div>
            </div>
        </div>
    </>
    :
    <Spinner/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Product);
