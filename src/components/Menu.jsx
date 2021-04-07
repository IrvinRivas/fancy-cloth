import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import '../styles/Menu.css';

import menu from '../images/menu-button.png';
import close from '../images/close.png';

const Menu = () => {

    const [isOpenMenu, setOpenMenu] = useState(false);

    const openMenu = () => {
        setOpenMenu(current => !current)
    }

    return( 
        <>
        {isOpenMenu ?
        <div id="menu" className="menu">
                <div className="menu-container">
                    <img 
                    src={close} 
                    alt="hamburger menu" 
                    className="menu-icon"
                    onClick={openMenu}
                    />
                    <ul>
                        <li className="menu-options">Caballeros
                            <ul>
                                <Link to="/search/playera/hombre/0/0"><li className="menu-options__submenu">Playeras</li></Link>
                                <Link to="/search/camisa/hombre/0/0"><li className="menu-options__submenu">Camisas</li></Link>
                                <Link to="/search/tennis/hombre/0/0"><li className="menu-options__submenu">Tennis</li></Link>
                                <Link to="/search/collar/hombre/0/0"><li className="menu-options__submenu">Collar</li></Link>
                            </ul>
                        </li>

                        <li className="menu-options">Dama
                            <ul>
                                <Link to="/search/vestido/mujer/0/0"><li className="menu-options__submenu">Vestidos</li></Link>
                                <Link to="/search/tennis/mujer/0/0"><li className="menu-options__submenu">Tennis</li></Link>
                                <Link to="/search/zapatillas/mujer/0/0"><li className="menu-options__submenu">Zapatillas</li></Link>
                                <Link to="/search/collar/mujer/0/0"><li className="menu-options__submenu">Collar</li></Link>                               
                            </ul>
                        </li>
                    </ul> 
                </div>
                </div>
                :  
                <img 
                    src={menu} 
                    alt="hamburger menu" 
                    className="menu-icon icon-open"
                    onClick={openMenu}
                /> 
            }
        </>
    )
}

export default Menu;