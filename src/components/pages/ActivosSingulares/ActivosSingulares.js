import React, { useEffect,useState, useContext } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import routes from '../../../config/routes';
import { Link, generatePath} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Header from '../../common/Header/Header';
import banera from '../../../assets/SVG/mobile/anuncios/anuncios_banos.svg';
import habit from '../../../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg';
import piscina from '../../../assets/SVG/mobile/anuncios/anuncios_piscina.svg';
import refer from '../../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../../assets/SVG/mobile/anuncios/anuncios_spfcie.svg';
import order from '../../../assets/SVG/mobile/comun/flechaOrdenar.svg';
import './activosSingulares.scss';
import { generalContext } from '../../../providers/generalProvider';
import ContactIndex from '../../common/ContactInfo/ContactIndex';
import supP from '../../../assets/SVG/web/anuncios/anuncios_superficieP.svg';
import mayor from '../../../assets/SVG/web/comunes/mayor.svg'

const ActivosSingulares = () => {

    const [orderedItems, setOrderedItems] = useState([])
    const [perPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0)
    const [state, setState] = useContext(generalContext);
    const [coord, setCoord] = useState(0);
    const [pagElements, setPagElements] = useState();
    const [orderItems, setOrderItems] = useState(false);

    const setPosition = () => {
        if (coord !== 0) {
            window.localStorage.setItem(
                'storedPosition2', JSON.stringify(coord)
            )
        }
    }

    const pagesVisited = pageNumber * perPage;
    const pageCount = Math.ceil(orderedItems.length/perPage);
    const getPostItems = orderedItems.slice(pagesVisited, pagesVisited + perPage)
    .map(item => {
        return item.showOnWeb === true? 
        <div onClick={setPosition} className='singular__list__item' key={item._id} details={item}>
            {item.gvOperationClose === 'Alquilado' || item.gvOperationClose === 'Vendido' ?
                <div className='wrapper'>
                    <div className='singular__list__item__status'>
                        <p>{item.gvOperationClose}</p>
                    </div>
                    <Carousel 
                        className='singular__list__item__images'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        <img src={item.images.main} alt={item.title}/>
                        {item.images.others.map((image)=> (
                            <img key={item.title} src={image} alt={item.title}/>
                        ))}
                    </Carousel>
                    <div>
                        <div className='singular__list__item__text'>
                            {item.adType.length === 1 ? 
                                <h2 className='singular__list__item__text__price'>{item.adType.map(type => 
                                    type==='Venta' && item.sale.saleShowOnWeb ? 
                                    `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                    type==='Alquiler' && item.rent.rentShowOnWeb ?
                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='singular__list__item__text__prices'>
                                    {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                    {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }                        
                            <h2 className='singular__list__item__text__title'>{item.title}</h2>
                            <h3 className='singular__list__item__text__street'>{item.webSubtitle}</h3>
                            <ul className='singular__list__item__text__characteristics'>
                                {item.buildSurface !== 0 ? 
                                    <li><span><img src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                                {item.quality.outdoorPool !== 0 ?
                                    <li><span><img src={piscina} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                :null}
                                {item.quality.bathrooms !== 0 ?
                                    <li><span><img src={banera} alt='baños'/></span>{item.quality.bathrooms}</li>
                                :null}
                                {item.quality.bedrooms !== 0 ?
                                    <li><span><img src={habit} alt='habitaciones'/></span>{item.quality.bedrooms}</li>
                                :null}
                                {item.adReference !== 0 ? 
                                    <li><span><img src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                :null}
                                {item.buildSurface !== 0 ?
                                    <li><span><img src={supP} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                            </ul>
                            <div className='singular__list__item__text__blocker'></div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Carousel 
                        className='singular__list__item__images'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        <img src={item.images.main} alt={item.title}/>
                        {item.images.others.map((image)=> (
                            <img key={item.title} src={image} alt={item.title}/>
                        ))}
                    </Carousel>
                    <Link onClick={() => {setState({item:item})}}  to={generatePath(routes.ItemResidential, {id:item._id})}>
                        <div className='singular__list__item__text'>
                            {item.adType.length === 1 ? 
                                <h2 className='singular__list__item__text__price'>{item.adType.map(type => 
                                    type==='Venta' && item.sale.saleShowOnWeb ? 
                                    `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                    type==='Alquiler' && item.rent.rentShowOnWeb ?
                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='singular__list__item__text__prices'>
                                    {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                    {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }                        
                            <h2 className='singular__list__item__text__title'>{item.title}</h2>
                            <h3 className='singular__list__item__text__street'>{item.webSubtitle}</h3>
                            <ul className='singular__list__item__text__characteristics'>
                                {item.buildSurface !== 0 ? 
                                    <li><span><img src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                                {item.quality.outdoorPool !== 0 ?
                                    <li><span><img src={piscina} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                :null}
                                {item.quality.bathrooms !== 0 ?
                                    <li><span><img src={banera} alt='baños'/></span>{item.quality.bathrooms}</li>
                                :null}
                                {item.quality.bedrooms !== 0 ?
                                    <li><span><img src={habit} alt='habitaciones'/></span>{item.quality.bedrooms}</li>
                                :null}
                                {item.adReference !== 0 ? 
                                    <li><span><img src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                :null}
                                {item.buildSurface !== 0 ?
                                    <li><span><img src={supP} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                            </ul>
                            <div className='singular__list__item__text__clickable'></div>
                        </div>
                    </Link>
                </div>
            }
        </div> : null
    })

    useEffect(() => {
        setTimeout(function(){
            const localPosition = window.localStorage.getItem('storedPosition')
            if (localPosition !== 0) {
                window.scroll( {
                    top:localPosition-650
                })
            }else{
                window.scroll(
                    {top:0}
                )
            }
        },1)
    },[])

    useEffect(() => {
        if (state.length>=1) {
            let reducedState = []
            state.map(item => 
                item.adBuildingType.includes('Activos singulares') && item.showOnWeb === true ? reducedState.push(item) : null
            )
            window.localStorage.setItem(
                'storedState', JSON.stringify(reducedState)
            )
        }
    },[state])

    useEffect(() => {
        window.localStorage.removeItem('storedState2')
    },[])

    useEffect (() => {
        const localState = window.localStorage.getItem('storedState')
        let singularItems = []
        if (localState) {
            const itemList = JSON.parse(localState)
            itemList.map(item => 
                item.adBuildingType.map(type => 
                    type==="Activos singulares" ? singularItems.push(item) : null
                )
            )
            const array = Object.values(singularItems)
            const sortArray = (a, b) => {
                if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                if (a.sale.saleValue > b.sale.saleValue) {return -1;}
                return 0
            }
            let orderedArrayPrice = array.sort(sortArray);
            singularItems=orderedArrayPrice
        }
        setOrderedItems(singularItems)
    },[])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4])-1)
        for(let i = 0; i<pageCount; i++){
            elements.push(
                <li onclick={window.localStorage.removeItem('storedPosition2')} className={i+1 === parseInt(splitedLocation[4]) ? 'singular__pagination__list__item currentPage' : 'singular__pagination__list__item'}><a href={`https://gvre.es/residential/${i+1}`}>{i+1}</a></li>
            )
        }
        setPagElements(elements)
    },[pageCount])

    useEffect(() => {
        setTimeout(function(){
            const localPosition = window.localStorage.getItem('storedPosition2')
            if (localPosition !== 0) {
                window.scroll( {
                    top:localPosition-700
                })
            }else{
                window.scroll(
                    {top:0}
                )
            }
        },1)
    },[])

    const onPrice = () => {
        const array = Object.values(orderedItems)
        const sortArray = (a, b) => {
            if (a.sale.saleValue < b.sale.saleValue) {return 1;}
            if (a.sale.saleValue > b.sale.saleValue) {return -1;}
            return 0
        }
        let orderedArrayPrice = array.sort(sortArray);
        setOrderedItems(orderedArrayPrice)
        setOrderItems(!orderItems)
    }

    window.onmousemove = function (e){
        var y = e.pageY
        setCoord(y)
    }

    const deletePosition = () => {
        window.localStorage.removeItem('storedPosition2')
    }

    const onDate = () => {
        const array = Object.values(orderedItems)
        const sortArray = (a, b) => {
            if (a.createdAt < b.createdAt) {return 1;}
            if (a.createdAt > b.createdAt) {return -1;}
            return 0
        }
        let orderedArrayDate = array.sort(sortArray);
        setOrderedItems(orderedArrayDate)
        setOrderItems(!orderItems)
    }

    const toggleOrderItems = () => {
        setOrderItems (!orderItems)
    }

  return (
    <div className='singular'>
        {orderedItems.length>0 ? 
            <div>
                <Header/>
                <h1 className='singular__title'>Activos singulares</h1>
                <div className='singular__buttons'>
                    <div className='singular__buttons__order'>
                        <p onClick={toggleOrderItems} className='singular__buttons__order__title'>Ordenar por <img src={order} alt='boton ordenar por'/></p>
                        <ul className={orderItems === false ? 'singular__buttons__order__listDisabled': 'singular__buttons__order__list'}>
                            <li onClick={onPrice} className='singular__buttons__order__list__first'>Precio más alto</li>
                            <li onClick={onDate}>Más reciente</li>
                        </ul>
                    </div>
                </div>
                <div className='singular__list'>
                    {getPostItems}
                </div>
                <div onClick={deletePosition} className='singular__pagination'>
                    <ul className='singular__pagination__list'>
                        <li className='singular__pagination__list__item'><a className='singular__pagination__list__item__back' href={`https://gvre.es/singular/${pageNumber}`}> <img src={mayor} alt='simbolo mayor' /> </a></li>
                        {pagElements}
                        <li className='singular__pagination__list__item'><a className='singular__pagination__list__item__next' href={`https://gvre.es/singular/${pageNumber+2}`}> <img src={mayor} alt='simbolo menor' /> </a></li>
                    </ul>
                </div>
                <ContactIndex/>
            </div>
            :
            <div className='singular__empty'>
                <Header/>
                <h2 className='singular__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                <Link className='singular__empty__button' to={routes.Home}>Volver a la home</Link>            
            </div>
        }
    </div>  
    )
}

export default ActivosSingulares