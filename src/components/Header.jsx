import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import '../styles/Header.css';

import cart from '../images/cart.png'

const Header = (props) => {
    let history = useHistory(null)
    const form = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const formdata =  new FormData(form.current);
        const url = '/search/'+formdata.get('search')+'/cualquiera/0/0';
        history.push(url)
    }

    return(
        <header id="header">
            <div>
                <Link to="/"><h1>Fancy cloth</h1></Link>
            </div>
            <ul>
                {props.isLogged ?
                        <>
                        <Link to="/my-acount" ><li>hola {props.user.name.split(' ', 3 )[0]}</li></Link>
                        <Link className="header-cart__icon" to='/cart'><img src={cart} alt="cart" className="cart"/><p>{props.cart.length}</p></Link>
                        </>
                        :
                        <>
                        <Link to="/login"><div className="header-btn__login">
                            Login
                        </div></Link>
                        <Link to="/registrar"><div className="header-btn__login">
                            Registrarme
                        </div></Link>
                        </>
                    }
                    <ul>
                        <li className="menu-options">Caballeros
                            <ul className="menu-options__list">
                                <Link to="/search/playera/hombre/0/0"><li className="menu-options__submenu">Playeras</li></Link>
                                <Link to="/search/camisa/hombre/0/0"><li className="menu-options__submenu">Camisas</li></Link>
                                <Link to="/search/tennis/hombre/0/0"><li className="menu-options__submenu">Tennis</li></Link>
                                <Link to="/search/collar/hombre/0/0"><li className="menu-options__submenu">Collar</li></Link>
                            </ul>
                        </li>

                        <li className="menu-options">Dama
                            <ul className="menu-options__list">
                                <Link to="/search/vestido/mujer/0/0"><li className="menu-options__submenu">Vestidos</li></Link>
                                <Link to="/search/tennis/mujer/0/0"><li className="menu-options__submenu">Tennis</li></Link>
                                <Link to="/search/zapatillas/mujer/0/0"><li className="menu-options__submenu">Zapatillas</li></Link>
                                <Link to="/search/collar/mujer/0/0"><li className="menu-options__submenu">Collar</li></Link>                               
                            </ul>
                        </li>
                    </ul>
                    <div className="search-form">
                <form ref={form}>
                    <input
                        className="header-input__search"
                        name="search" 
                        type="text"
                        placeholder="busca una prenda"
                    />
                    <input 
                        className="header-btn__search" 
                        onClick={handleSearch}
                        type="submit"
                        value="buscar"
                    />
                </form>                
            </div>
            </ul>
        </header>
    )
}

const mapStateToProps = ({ userReducers }) => {
    return userReducers
}

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
