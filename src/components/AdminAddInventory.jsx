import React, { useEffect, useState,useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions';
import Spinner from './Spinner';
import API from '../utils/api';

function AdminInventory(props) {
    const [isShoes, setIsShoes] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [message, setMessage] = useState('');
    const [results, setResults] = useState([])
    const form = useRef(null);

    useEffect(() => {
        if (!props.garmentReducers.garments) {
            props.garmentReducers.getAll()
        }
        if(props.garmentReducers.garments[0].type === 2){
            setIsShoes(true);
        }else{
            setIsShoes(false);
        }
    },[props.garmentReducers.garments])

    const searchProduct = (e) => {
        let target = e.target.selectedIndex;
        if(props.garmentReducers.garments[target].type === 2){
            setIsShoes(true);
        }else{
            setIsShoes(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);

        const data = {
            'product': formData.get('product'),
            'size': formData.get('size'),
            'amount': formData.get('amount')
        }
        const token = props.userReducers.token;
        
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
                setMessage(data.body)
                setIsAdd(true)
            })

    }

    const handleSearchProduct = (e) => {
        let value = e.target.value;
        let results = []
        if (value.split(' ',3).length > 1) {
            results = props.garmentReducers.garments.filter(garment => garment.title.toLowerCase() === value.toLowerCase());   
        }else{
            results = props.garmentReducers.garments.filter(garment => {
                return garment.title.toLowerCase().split(' ',3)[0] === value.toLowerCase() 
                || garment.title.toLowerCase().split(' ',3)[1] === value.toLowerCase()
                || garment.title.toLowerCase().split(' ',3)[2] === value.toLowerCase()
            });
        }
        setResults(results)
    }
 
    const selectOptionSearch = (e) => {
        const product = e.target.id.split('/',2)
        const select = document.getElementById('select-product')
        const resultsContainer = document.getElementById('search-product__container');

        select.value = product[0];
        resultsContainer.style.display = 'none';
        if (parseInt(product[1]) === 2) {
            setIsShoes(true)
        }else{
            setIsShoes(false)
        }
    }

    return (
        <>
        {props.garmentReducers.garments.length > 0 ?
            <div className="admin-inventory">
            {isAdd === false ?
            <>
            <h1>Inventario</h1>
            <p>Selecciona el producto o buscalo dentro del input</p>
            <form ref={form} className="form" >
                <label>Producto:</label>
                <div className="form-group">
                    <select id="select-product" className="input select form-group__item" onChange={searchProduct} name="product">
                        {props.garmentReducers.garments.map(garment => (
                            <option key={garment.id} value={garment.id}>{garment.title}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Buscar Producto" id="searchInput"className="input form-group__item" onChange={handleSearchProduct}/>
                    {results.length > 0 &&
                        <div id="search-product__container">
                            {results.map((result,i) => (
                                <p key={i} id={result.id+'/'+result.type} className="search-product__option" onClick={selectOptionSearch}>{result.title}</p>
                            ))}
                        </div>
                    }
                </div>
                <br/>
                <label>Talla:</label>
                <select className="input select" name="size">
                {isShoes === true ?
                <>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                </>
                    :
                <>
                    <option value="x">x</option>
                    <option value="m">m</option>
                    <option value="g">g</option>
                </>

                }
                </select>
                <input 
                    className="input" 
                    name="amount"
                    type="number" 
                    placeholder="Cantidad"
                />
                <br/>
                <input 
                    type="submit" 
                    className="main-btn" 
                    onClick={handleSubmit}
                />
            </form>
            </>
            :
            <>
                <h1>{message}</h1>
                <button className="main-btn" onClick={() => setIsAdd(false)}>Actualizar otro producto</button>
                <Link to="/admin">Volver</Link>
            </>
            }
        </div>
        :
        <Spinner/>
        }
        </>
    )
}

const mapStateToProps = ({ garmentReducers,userReducers }) => {
    return { 
        garmentReducers,
        userReducers
    };
}

const mapDispatchToProps = {
    ...garmentsActions,
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminInventory)
