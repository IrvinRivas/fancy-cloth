import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Card.css'

const Card = (props) => {
    return(
        <Link to={`/producto/${props.id}`}>
            <div className="card" key={props.id}>
                <img src={props.image} className="card-image" alt={props.title}/>
                <div className="card-hero">
                    <h2 className="card-title">{props.title}</h2>
                    <strong><p>${props.price}</p></strong>
                </div>                     
            </div>
        </Link>
    )
}

Card.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.number,
    price: PropTypes.number,
    genre:PropTypes.number
}

export default Card;
