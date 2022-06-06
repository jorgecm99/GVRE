import React from 'react'
import './footer.scss'
/* import footer_email from '../../../assets/SVG/mobile/comun/footer_email.svg' */
import footer_instagram from '../../../assets/SVG/mobile/comun/footer_instagram.svg'
import footer_linkedin from '../../../assets/SVG/mobile/comun/footer_linkedin.svg'
import logo_attomo from '../../../assets/SVG/web/comunes/logo-attomo.svg';
import logo from '../../../assets/logo.svg'
import routes from '../../../config/routes.js'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className='footer'>
                <div className='footer__left'>
                    <img className='footer__left__logo' src={logo} alt='logo'/>
                    <Link to={routes.Aviso} className='footer__left__AL'>Aviso legal</Link>
                    <Link to={routes.Politica} className='footer__left__PP'>Política de privacidad</Link>
                </div>
                <div className='footer__center'>
                    <a target='blank' href='https://attomo.digital/'>
                        <p>Powered by</p>
                        <img src={logo_attomo} alt='Attomo'/>
                    </a>
                </div>
                <div className='footer__right'>
                    <Link to={routes.Contact} className='footer__right__text'> Contacto</Link>
                    {/* <a target='blank' href='mailto:info@gvre.es'><img src={footer_email} alt='email'/></a> */}
                    <a target='blank' href='https://instagram.com/gv_real_estate_?utm_medium=copy_link'><img src={footer_instagram} alt='instagram'/></a>
                    <a target='blank' href='https://www.linkedin.com/company/gv-real-estate/'><img src={footer_linkedin} alt='linkedin'/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
