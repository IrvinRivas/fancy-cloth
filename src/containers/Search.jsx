import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as garmentsActions from '../actions/garmentsActions';

import SearchFilter from '../components/SearchFilter';
import '../styles/Search.css'

const Search = (props) => {
    const product = props.match.params.product;
    const genre = props.match.params.genre;
    const minParam = props.match.params.min;
    const maxParam = props.match.params.max;
    const min = parseInt(minParam);
    const max = parseInt(maxParam);
    const [garments, setGarments] = useState([])
    let initialGarments;

    const searchProduct = () => {
        if (product.split(' ',3).length > 1) {
            return props.garmentReducers.garments.filter(garment => garment.title.toLowerCase() === product.toLowerCase());
        }else{
            return props.garmentReducers.garments.filter(garment => {
                return garment.title.toLowerCase().split(' ',3)[0] === product.toLowerCase()
                || garment.title.toLowerCase().split(' ',3)[1] === product.toLowerCase()
                || garment.title.toLowerCase().split(' ',3)[2] === product.toLowerCase()
            });
        }   
    }

    const FilterByGenre = () => {
        if (genre === 'hombre') {
            return initialGarments.filter(garments => garments.genre === 0)
        }
        if (genre === 'mujer') {
            return initialGarments.filter(garments => garments.genre === 1);
        }else{
            return initialGarments;
        }
    }

    const filterByPrice = (garment) => {
        if (min === 0 && max === 0) {
            return garment;
        }
        if (min > 0 && max === 0) {
            return garment.filter(g => g.price > min)   
        }
        if (max > 0 && min === 0) {
            return garment.filter(g => g.price < max)   
        }
        if (min > 0 && max > 0) {
            let filterMin = garment.filter(g => g.price > min);
            return filterMin.filter(g => g.price < max)
        }
    }

    const applyFilters = () => {
        let filterGenre = FilterByGenre();
        let filterPrice;
        if (genre === 'hombre' || genre === 'mujer'){
            filterPrice = filterByPrice(filterGenre)
        }else{
            filterPrice = filterByPrice(initialGarments)
        }
        setGarments(filterPrice)
    }

    useEffect(() => {
        initialGarments =  searchProduct();
        applyFilters()
    },[props])

    return(
        <>
            <Helmet>
                <title>Resultados de {product}</title>
            </Helmet>
            <SearchFilter product={product}/>
            {garments.length > 0 ?
                <div className="search">
                    <h1>{product}</h1>
                    <h3>Resultados: {garments.length}</h3>
                    {garments.map(garment => (
                        <Link to={"/producto/"+garment.id} key={garment.id}>
                            <div className="search-item">
                                <img src={garment.image} className="search-image" alt=""/>
                                <div className="search-hero">
                                    <h2>{garment.title}</h2>
                                    <h3>${garment.price}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                :
                <h3>ups... no hay resultados</h3>
            }
        </>
    )
}

const mapStateToProps = ({ garmentReducers }) => {
    return {
        garmentReducers
    }
}

const mapDispatchToProps = {
    ...garmentsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

