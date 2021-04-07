import React from 'react';
import '../styles/index.css';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

const Layout = ({ children }) => {
    return( 
        <>
        <Header/>
            <div id="content">
                {children}
            </div>
        <Footer/>
        </>
    )
}

export default Layout;