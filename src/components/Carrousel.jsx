import React from 'react';
import '../styles/Carrousel.css';

const Carrousel = ({children,title}) => {
    return(
        <div className="carrousel">
            <h3>{title}</h3>
            <div className="carrousel-content">
                {children}
            </div>
        </div>
    )
}

export default Carrousel;
