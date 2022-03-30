import React from 'react';
import { Link } from 'react-router-dom';
import './contactIndex.scss';
import logo from '../../../assets/logo.svg';
import routes from '../../../config/routes';

const ContactIndex = () => {
  return (
    <div className='contactIndex'>
        <h2 className='contactIndex__title'>Hable con nosotros</h2>
        <div className='contactIndex__location'>
            <img className='contactIndex__location__logo' src={logo} alt='logo'/>
            <div className='contactIndex__location__left'>
                <p>C. Lagasca,36, Madrid</p>
                <p>C. Isla de Oza, 16, Madrid</p>
            </div>
            <div className='contactIndex__location__right'>
                <p>917 36 53 85</p>
                <a target='blank' href='mailto:info@gvre.es'>info@gvre.es</a>
            </div>
        </div>
        <Link to={routes.Contact} className='contactIndex__button'>Contactar</Link>
    </div>
  )
}

export default ContactIndex