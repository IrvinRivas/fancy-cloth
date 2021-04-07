import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as userActions from '../actions/userActions';

import AdminAddInventory from '../components/AdminAddInventory';
import AdminInventaryNotAvailable from '../components/AdminInventaryNotAvailable';
import AdminInventoryTotal from '../components/AdminInventoryTotal';
import '../styles/Inventory.css';

const  AdminInventory = (props) => {
    const [option, setOption] = useState(0);
    const history = useHistory(null)

    const addSelectedClass = (target) => {
        const elements = document.getElementsByClassName('inventory-item');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('inventory-item__selected') 
        }
        target.classList.add('inventory-item__selected')
    }

    const showAddinventory = () => {
        let target = document.getElementById('add');
        addSelectedClass(target)
        option === 1 ? setOption(0) : setOption(1)
    }

    const showinventory = () => {
        let target = document.getElementById('watch');
        addSelectedClass(target)
        option === 2 ? setOption(0) : setOption(2)
    }

    const showNotAvailable = () => {
        let target = document.getElementById('notAvaliable');
        addSelectedClass(target)
        option === 3 ? setOption(0) : setOption(3)
    }

    return (
        <>
        {props.userReducers.token ? 
        <>

        <Helmet>
            <title>Admin: inventario</title>
        </Helmet>
            <div className="inventory-container">
                <Link to="/admin">Volver</Link>
                
                <div className="inventory-item" id="add" onClick={showAddinventory}>
                        <h1>Agregar</h1>
                </div>

                <div className="inventory-item" id="watch" onClick={showinventory}>
                    <h1>Ver Inventario</h1>
                </div>

                <div className="inventory-item" id="notAvaliable" onClick={showNotAvailable}>
                    <h1>Sin existencias</h1>
                </div>
            </div>
        <div className="inventory-main">
            {option === 1 &&
                <AdminAddInventory/>
            }
            {option === 2 &&
                <AdminInventoryTotal/>
            }
            {option === 3 &&
                <AdminInventaryNotAvailable/>
            }
        </div>
        </>
        :
        history.push('/admin')
        }
        </>
    )
}

const mapStateToProps = ( userReducers ) => {
    return userReducers
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminInventory)
