import React, {useState} from 'react';
import './headerHome.scss';
import menuHam from '../../../assets/SVG/mobile/comun/menuHam.svg';
import Home_instagram from '../../../assets/SVG/mobile/comun/Home_instagram.svg';
import home_linkedin from '../../../assets/SVG/mobile/comun/home_linkedin.svg';
import logo from '../../../assets/logoBlanco.svg'
import { NavLink } from "react-router-dom";
import routes from "../../../config/routes";
import cerrarFiltro from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';


const Header = () => {
    const [isActive, setActive] = useState('false');
    const toggleClass = () => {
        setActive(!isActive)
    }
    const situate = () => {
        window.scroll ({
            top:750,
            behavior:'smooth'
        })
    }
    const situate2 = () => {
        window.scroll ({
            top:1650,
            behavior:'smooth'
        })
    }
    const situate3 = () => {
        window.scroll ({
            top:2550,
            behavior:'smooth'
        })
    }
    const situate4 = () => {
        window.scroll ({
            top:3250,
            behavior:'smooth'
        })
    }
    return (
        <header>
            <div className='headerHome'>
                <div className='headerHome__logo'><img src={logo} alt='logo'/></div>
                <div className='headerHome__menu'>
                    <span onClick={toggleClass} className='headerHome__menu__burguer'><img src={menuHam} alt='menu'/></span>
                    <ul className={isActive ? "notVisibleMenu headerHome__menu__list" : 'headerHome__menu__list'}>
                        <img onClick={toggleClass} className='headerHome__menu__list__close' src={cerrarFiltro} alt='cerrar'/>
                        <li className='headerHome__menu__list__home'><NavLink onClick={toggleClass} to={routes.Home}>Home</NavLink></li>
                        <li><NavLink onClick={toggleClass} to={routes.FilterResidential}>Residencial</NavLink></li>
                        <li><NavLink onClick={toggleClass} to={routes.FilterPatrimonial}>Patrimonio</NavLink></li>
                        <li className='headerHome__menu__list__GV'>
                            <div className='headerHome__menu__list__GV__name'>
                                GV Real Estate
                                <ul className='headerHome__menu__list__GV__name__menu' >
                                    <li><NavLink onClick={toggleClass} to={routes.Team}>Equipo</NavLink></li>
                                    <li><NavLink onClick={toggleClass} to={routes.Contextual}>Comercialización</NavLink></li>
                                    <li><NavLink onClick={toggleClass && situate} to={routes.Contextual}>Inversión</NavLink></li>
                                    <li><NavLink onClick={toggleClass && situate2} to={routes.Contextual}>Gestión patrimonial</NavLink></li>
                                    <li><NavLink onClick={toggleClass && situate3} to={routes.Contextual}>Nuevos desarrollos</NavLink></li>
                                    <li><NavLink onClick={toggleClass && situate4} to={routes.Contextual}>Arquitectura e interiorismo</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className='headerHome__menu__list__contact'><NavLink onClick={toggleClass} to={routes.Contact}>Contacto</NavLink></li>
                        <li className='headerHome__menu__list__social'>
                            <div>
                                <img onClick={toggleClass} src={Home_instagram} alt='instagram'/>
                                <img onClick={toggleClass} src={home_linkedin} alt='linkedin'/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
