import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as garmentsActions from '../actions/garmentsActions';
import API from '../utils/api';
import InventaryTable from './InventaryTable';
import Spinner from './Spinner';

function AdminInventoryTotal(props) {
    const [stock, setStock] = useState([]);

    useEffect(()=> {
        fetch(API+'/stock')
            .then(response => response.json())
            .then(data => {
                setStock(data.body)
            })
    },[])

    return (
        <div>
            <h1>Inventario</h1>
            {stock.length > 0 ?
                <>
                <InventaryTable data={stock}/>
                </>
                :
                <Spinner/>
            }
        </div>

    )
}

const mapStateToProps = ({ garmentReducers }) => {
    return garmentReducers;
}

const mapDispatchToProps = {
    ...garmentsActions
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminInventoryTotal)
