import React, { useState,useRef } from 'react';
import { useHistory } from 'react-router-dom';

const SearchFilter = (props) => { 
    let history = useHistory(null);
    const form = useRef(null);

    const { product } = props;

    const handleApplyFilter = (e) => {
        e.preventDefault();
        const formdata =  new FormData(form.current);
        const women = formdata.get('women');
        const men = formdata.get('men');
        let minSelected = parseInt(formdata.get('min'));
        let maxSelected = parseInt(formdata.get('max'));

        if (!minSelected) {
            minSelected = 0;
        }

        if (!maxSelected) {
            maxSelected = 0;
        }

        if (women) {
            history.push('/search/'+product+'/mujer/'+minSelected+'/'+maxSelected)
        }
        if (men) {
            history.push('/search/'+product+'/hombre/'+minSelected+'/'+maxSelected)
        }
        if (men && women || !men && !women) {
            history.push('/search/'+product+'/cualquiera/'+minSelected+'/'+maxSelected)
        }
    }


    return(
    <div className="search-filter">
    <form ref={form}>
        <div className="search-filter__options">
            <label className="search-input">
                mujer: 
                <input name="women"  type="checkbox"/>
            </label>
        </div>
        <div className="search-filter__options">
            <label className="search-input">
                hombre: 
                <input name="men"  type="checkbox"/>
            </label>
        </div>
        <div className="search-filter__options">
            <label className="search-input">
                min: 
                <select className="search-filter__select" name="min">
                    <option value="0">Rango de precios</option>
                    <option value="99"> $99</option>
                    <option value="199">$199</option>
                    <option value="399"> $399</option>
                    <option value="599"> $599</option>
                    <option value="999"> $999</option>
                    <option value="1999"> $1999</option>
                    <option value="4999">  $4999</option>
                    <option value="5000"> $5000</option>
                </select>
            </label>
        </div>
        <div className="search-filter__options">
            <label className="search-input">
                max:
                <select className="search-filter__select" name="max">
                    <option value="0">Rango de precios</option>
                    <option value="199">$199</option>
                    <option value="399"> $399</option>
                    <option value="599"> $599</option>
                    <option value="999"> $999</option>
                    <option value="1999"> $1999</option>
                    <option value="4999">  $4999</option>
                    <option value="5000">$7999</option>
                </select>
            </label>
        </div>
    </form>
    <div className="filter-button">
            <button onClick={handleApplyFilter} className="main-btn">Aplicar</button>
    </div>
</div>
)}

export default SearchFilter;
