import React, { useEffect, useContext, useState } from 'react'
import './home.scss'
import flechaEnviar from '../../../assets/SVG/mobile/comun/flechaEnviar.svg'
import flechaAbajo from '../../../assets/SVG/mobile/comun/flechaAbajo.svg'
import flechaCategoriasWeb from '../../../assets/SVG/web/comunes/flechaCategoriasWeb.svg'
import routes from '../../../config/routes.js';
import Header from '../../common/HeaderHome/HeaderHome';
import { getResidential } from '../../../api-requests/requests';
import { generalContext } from '../../../providers/generalProvider';
import { Link, generatePath, NavLink } from 'react-router-dom';
import banera from '../../../assets/SVG/mobile/anuncios/anuncios_banos.svg';
import habit from '../../../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg';
import piscina from '../../../assets/SVG/mobile/anuncios/anuncios_piscina.svg';
import ref from '../../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../../assets/SVG/mobile/anuncios/anuncios_spfcie.svg';
import costa from '../../../assets/home/costa.png';
import singular from '../../../assets/home/singular.jpg';
import rustico from '../../../assets/home/rustico.png';
import ContactIndex from '../../common/ContactInfo/ContactIndex';
import flechaCarrusel from '../../../assets/SVG/web/comunes/homepageDestacados.svg';
import supP from '../../../assets/SVG/web/anuncios/anuncios_superficieP.svg';
import parking from '../../../assets/SVG/web/anuncios/anuncios_garaje.svg';

const Home = () => {
    const [state, setState] = useContext(generalContext);    
    const [destacado] = useState([]);

    useEffect (() => {
        getResidential().then(items=> {
            setState(items)
        })
    },[setState])

    useEffect(() => {
        window.scroll(
            {top:0}
        )
        window.localStorage.removeItem('storedPosition')
        window.localStorage.removeItem('storedPosition2')
    },[])
    
    const pushDestacados = () => {
        getResidential().then(items=> {
            items.map(item => 
                item.featuredOnMain === true ? destacado.push(item) : null
            )
        })
        return(state)
    }
    pushDestacados()

    const next = () => {
        let container = document.getElementById('carrusel');
        sideScroll(container, 'right', 5,1400,15)
    }
    const prev = () => {
        let container = document.getElementById('carrusel');
        sideScroll(container, 'left', 5,1400,15)
    }

    function sideScroll(element,direction,speed,distance,step){
        let scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction === 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }

    const arrow = () => {
        let element = document.getElementById('top');
        window.scroll({
            top:element.clientHeight,
            behavior:'smooth'
        })
    }

    const situate4 = () => {
        window.scroll ({
            top:3250,
            behavior:'smooth'
        })
    }
    const situate2 = () => {
        window.scroll ({
            top:0,
        })
    }

    return (
        <div className='home'>
            <Header/>
            <div id='top' className='home__top'>
                <div className='home__top__text'>
                    <h1 className='home__top__text__title'>GV Real Estate</h1>
                    <h2 className='home__top__text__content'>Expertos en gestión inmobiliaria de lujo</h2>
                </div>
                <div className='home__top__buttons'>
                    <Link to={generatePath(routes.Residential, {page:1})} className='home__top__buttons__residencial'>Residencial</Link>
                    <Link to={generatePath(routes.Patrimonial, {page:1})} className='home__top__buttons__patrimonio'>Patrimonio</Link>
                </div>
                <div className='home__top__arrow'>
                    <span><img src={flechaAbajo} alt='flecha' onClick={arrow}/></span>
                </div>
            </div>
            <div className='home__categories'>
                <h2 className='home__categories__title'>Explora las categorías</h2>
                <div className='home__categories__container'>
                    <NavLink to={routes.FilterResidential} className='home__categories__container__option'>
                        <div className='home__categories__container__option__residential'></div>
                        <h2 className='home__categories__container__option__name'>GV Residencial<span><img src={flechaCategoriasWeb} alt='flecha'/></span></h2>
                    </NavLink>
                    <NavLink to={routes.FilterPatrimonial} className='home__categories__container__option'>
                        <div className='home__categories__container__option__patrimonial'></div>
                        <h2 className='home__categories__container__option__name'>GV Patrimonio<span><img src={flechaCategoriasWeb} alt='flecha'/></span></h2>
                    </NavLink>
                    <NavLink to={routes.Contact} className='home__categories__container__option'>
                        <div className='home__categories__container__option__art'></div>
                        <h2 className='home__categories__container__option__name'>GV Arte<span><img src={flechaCategoriasWeb} alt='flecha'/></span></h2>
                    </NavLink>
                    <NavLink to={routes.Contact} className='home__categories__container__option'>
                        <div className='home__categories__container__option__catalog'></div>
                        <h2 className='home__categories__container__option__name'>GV Catálogo<span><img src={flechaCategoriasWeb} alt='flecha'/></span></h2>
                    </NavLink>
                </div>
            </div>
            <div className='home__more'>
                <div className='home__more__image'></div>
                <div className='home__more__text'>
                    <h3 className='home__more__text__title'>Interiorismo y arquitectos</h3>
                    <p className='home__more__text__description'>Nuestra marca representa el compromiso con para trabajar con el mejor equipo de expertos y brindarle un servicio a la altura de sus expectativas.</p>
                    <Link to={routes.Contextual} onClick={situate4} className='home__more__text__link'>Saber más <span className='longArrow'><img src={flechaEnviar} alt='flecha'/></span><span className='shortArrow'><img src={flechaCategoriasWeb} alt='flecha'/></span></Link>
                </div>
            </div>
            <div className='home__moreB'>
                <div className='home__moreB__image'></div>
                <div className='home__moreB__text'>
                    <h3 className='home__moreB__text__title'>Venda con nosotros</h3>
                    <p className='home__moreB__text__description'>La experiencia del cliente comprador es nuestra prioridad, es por ello que en GV nos centramos en ofrecer una búsqueda más condicionada para que las ofertas estén perfectamente centradas en sus necesidades.</p>
                    <Link to={routes.Contextual} className='home__moreB__text__link'>Saber más <span className='longArrow'><img src={flechaEnviar} alt='flecha'/></span><span className='shortArrow'><img src={flechaCategoriasWeb} alt='flecha'/></span></Link>
                </div>
            </div>
            <div className='home__more'>
                <div className='home__more__image2'></div>
                <div className='home__more__text'>
                    <h3 className='home__more__text__title'>Nuestras oficinas</h3>
                    <p className='home__more__text__description'>Nuestra marca representa el compromiso con para trabajar con el mejor equipo de expertos y brindarle un servicio a la altura de sus expectativas.</p>
                    <Link to={routes.Contact} onClick={situate2} className='home__more__text__link'>Saber más <span className='longArrow'><img src={flechaEnviar} alt='flecha'/></span><span className='shortArrow'><img src={flechaCategoriasWeb} alt='flecha'/></span></Link>
                </div>
            </div>
            <div className='home__otherCategories'>
                <h2 className='home__otherCategories__title'>Otras categorías</h2>
                <div className='home__otherCategories__categories'>
                    <Link to={generatePath(routes.Costa, {page:1})} className='home__otherCategories__categories__item'>
                        <img className='home__otherCategories__categories__item__image' src={costa} alt='categoría costa'/>
                        <div className='home__otherCategories__categories__item__link'>
                            <p>GV Costa</p>
                            <span><img src={flechaEnviar} alt='flecha'/></span>
                        </div>
                    </Link>
                    <Link to={generatePath(routes.Rustico, {page:1})} className='home__otherCategories__categories__item'>
                        <img className='home__otherCategories__categories__item__image' src={rustico} alt='categoría rustico'/>
                        <div className='home__otherCategories__categories__item__link'>
                            <p>GV Campos Rústicos</p>
                            <span><img src={flechaEnviar} alt='flecha'/></span>
                        </div>
                    </Link>
                    <Link to={generatePath(routes.Singular, {page:1})} className='home__otherCategories__categories__item'>
                        <img className='home__otherCategories__categories__item__image' src={singular} alt='categoría singulares'/>
                        <div className='home__otherCategories__categories__item__link'>
                            <p>GV Activos singulares</p>
                            <span><img src={flechaEnviar} alt='flecha'/></span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='home__outstanding'>
                <h2 className='home__outstanding__title'>Nuestros destacados</h2>
                    <div id='carrusel' className='home__outstanding__position'>
                        {destacado.length > 0 ? destacado.map(item => 
                            <Link key={item.title} to={generatePath(routes.ItemResidential, {id:item._id})} className='home__outstanding__position__images'>
                                <p className='home__outstanding__position__images__destacado'>DESTACADO</p>
                                <img className='home__outstanding__position__images__image' key={item._id} src={item.images.main} alt={item.title}/>
                                <div>
                                    <div className='home__outstanding__position__images__text'>
                                        <h2 className='home__outstanding__position__images__text__price'>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</h2>
                                        <h2 className='home__outstanding__position__images__text__title'>{item.title}</h2>
                                        <h3 className='home__outstanding__position__images__text__street'>{item.webSubtitle}</h3>
                                        <ul className='home__outstanding__position__images__item__text__characteristics'>
                                            {item.buildSurface !== 0 ? 
                                            <li><span><img src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                            :null}
                                            {item.plotSurface !== 0 ?
                                            <li><span><img src={supP} alt='superficie'/></span>{item.plotSurface}m<sup>2</sup></li>
                                            :null}
                                            {item.quality.bedrooms !== 0 ?
                                                <li><span><img src={habit} alt='habitaciones'/></span>{item.quality.bedrooms}</li>
                                            :null}
                                            {item.quality.bathrooms !== 0 ?
                                                <li><span><img src={banera} alt='baños'/></span>{item.quality.bathrooms}</li>
                                            :null}
                                            {item.quality.parking !== 0 ?
                                                <li className='home__outstanding__position__images__item__text__characteristics__car'><span><img src={parking} alt='plazas parking'/></span>{item.quality.parking}</li>
                                            :null}
                                            {item.quality.outdoorPool !== 0 ?
                                                <li><span><img src={piscina} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                                :null}
                                            {item.adReference !== 0 ? 
                                                <li><span><img src={ref} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                            :null}
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        ): null}
                    </div>
                <div className='home__outstanding__buttons'>
                    <button className='home__outstanding__buttons__prev' onClick={prev}><img src={flechaCarrusel} alt='flecha'/></button>
                    <button className='home__outstanding__buttons__next' onClick={next}><img src={flechaCarrusel} alt='flecha'/></button>
                </div>
            </div>
            <ContactIndex/>
        </div>
    )
}

export default Home
