import React, { useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions'
import API from '../utils/api';

import '../styles/Analitycs.css'
import {Link, useHistory } from 'react-router-dom';

function AdminAnalitycts(props) {
    const [total, setTotal] = useState([]);
    const [option, setOption] = useState(0);
    const [isUsedDate, setUsedDate] = useState(false);
    const [date, setDate] = useState('');
    const form = useRef(null);
    const history = useHistory(null)

    const addSelectedClass = (target) => {
        const elements = document.getElementsByClassName('analitycs-options__item');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('analitycs-options__selected') 
        }
        target.classList.add('analitycs-options__selected')
    }

    const getAmountTotal = () => {

        let target = document.getElementById('total');
        addSelectedClass(target)

        if (isUsedDate !== false) {
            setUsedDate(false)
        }
        if (option !==1) {
            fetch(API+'/orders/analitycs/all')
            .then(response => response.json())
            .then(data => {
                setTotal(Object.values(data.body)[0])
                setOption(1)
            })   
        }else{
            setOption(0)
        }
    }

    const printInputsDate = () => {
        let target = document.getElementById('totalByDate');
        addSelectedClass(target);
        if (option !== 0) {
            setOption(0)
        }
        if (isUsedDate === true) {
            setUsedDate(false);   
        }else{
            setUsedDate(true)
        }
    }

    const applyFilterDate = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        let initial = formData.get('initial');
        let final =  formData.get('final');

        fetch(`${API}/orders/analitycs/time/${initial}/${final}`)
            .then(response => response.json())
            .then(data => {
                setTotal(Object.values(data.body)[0])
                setOption(2)
                setDate(`de ${initial} a ${final}`)
            })
    }

    return (
        <>
        {props.userReducers.token ? 
        <>
            <Helmet>
                <title>Analitica de ventas</title>
            </Helmet>
                <div className="analitycts-container">
                <h1>Analitica de ventas</h1>
                <div className="analitycs-options">
                    <Link to="/admin">Volver</Link>
                    <div className="analitycs-options__item" id="total" onClick={getAmountTotal}>
                        <h2>Ventas total</h2>
                    </div>
                    <div className="analitycs-options__item" id="totalByDate" onClick={printInputsDate}>
                        <h2>Ventas por fecha</h2>
                    </div>
                </div>

                {isUsedDate &&
                    <form ref={form} className="form">
                        <div className="form-group">
                            <input name="initial" className="input form-group__item" type="date"/>
                            <input name="final" className="input form-group__item" type="date"/>
                            <input 
                                className="input form-group__item main-btn" 
                                onClick={applyFilterDate}
                                value="Aplicar" 
                                type="submit"
                            />
                        </div>
                    </form>
                }

                {option === 1 && 
                    <div className="analitycs-data">
                        <h1>Monto de todas las ventas :</h1>
                        <h1>${total}</h1>
                    </div>
                }

                {option === 2 &&
                    <div className="analitycs-data">
                        <h1>Monto de ventas generado {date} :</h1>
                        <h1>${total > 0 ? total : 0}</h1>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminAnalitycts)

