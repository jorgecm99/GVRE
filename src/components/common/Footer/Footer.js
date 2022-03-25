import React from 'react'
import './footer.scss'
import footer_attomo from '../../../assets/SVG/mobile/comun/footer_attomo.svg'
import footer_email from '../../../assets/SVG/mobile/comun/footer_email.svg'
import footer_instagram from '../../../assets/SVG/mobile/comun/footer_instagram.svg'
import footer_linkedin from '../../../assets/SVG/mobile/comun/footer_linkedin.svg'
import logo from '../../../assets/logo.svg'
import routes from '../../../config/routes.js'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className='footer'>
                <div className='footer__left'>
                    <img className='footer__left__logo' src={logo} alt='logo'/>
                    <a href='./' className='footer__left__AL'>Aviso legal</a>
                    <a href='./' className='footer__left__PP'>Política de privacidad</a>
                    <a href='./' className='footer__left__PC'>Política de cookies</a>
                </div>
                <div className='footer__center'>
                    <a target='blank' href='https://attomo.digital/'>
                        <img src={footer_attomo} alt='Attomo'/>
                    </a>
                </div>
                <div className='footer__right'>
                    <Link to={routes.Contact} className='footer__right__text'> Contacto</Link>
                    <img src={footer_email} alt='email'/>
                    <img src={footer_instagram} alt='instagram'/>
                    <img src={footer_linkedin} alt='linkedin'/>
                </div>
            </div>
        </footer>
    )
}

export default Footer
