import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import * as garmentsActions from '../actions/garmentsActions';
import { connect } from 'react-redux';
import InventaryTable from './InventaryTable';

const AdminInventaryNotAvailable = (props) => {
    const [stock, setStock] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch(API+'/stock/notAvailable')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.body)) {
                    setStock(data.body)    
                }else{
                    setMessage(data.body)
                }
            })
    })

    const searchProduct = (id) => {
        let product = props.garments.filter(product => product.id === id);
        return product[0]
    }

    return (
        <div>
            <h1>Productos sin existencia</h1>
            {stock.length > 0 ? 
                <InventaryTable data={stock}/>
                :
                <h1>{message}</h1>
            }
        </div>
    )
}

const mapStateToProps = ({ garmentReducers }) => {
    return garmentReducers
}

const mapDispatchToProps = {
    ...garmentsActions
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminInventaryNotAvailable)
