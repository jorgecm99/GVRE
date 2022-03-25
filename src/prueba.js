import React, { useEffect,useState, useContext } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./patrimonio.scss"
import routes from '../../../config/routes';
import { Link, generatePath, NavLink} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import parking from '../../../assets/SVG/web/anuncios/anuncios_garaje.svg';
import job from '../../../assets/SVG/web/anuncios/anuncios_trabajo.svg';
import refer from '../../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../../assets/SVG/web/anuncios/anuncios_superficieP.svg'
import filterImg from '../../../assets/SVG/mobile/comun/iconoFiltros.svg';
import order from '../../../assets/SVG/mobile/comun/flechaOrdenar.svg';
import zoneMap from '../../../assets/SVG/mobile/anuncios/anuncios_mapa.svg';
import { generalContext } from '../../../providers/generalProvider';
import Header from '../../common/Header/Header';
import ContactIndex from '../../common/ContactInfo/ContactIndex'

const Patrimonio = () => {
    const [orderedItems, setOrderedItems] = useState([])
    const [perPage] = useState(31);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagElements, setPagElements] = useState();

    const [orderItems, setOrderItems] = useState(false);
    const [state, setState] = useContext(generalContext);

    const [coord, setCoord] = useState(0)

        const setPosition = () => {
        if (coord !== 0) {
            window.localStorage.setItem(
                'storedPosition', JSON.stringify(coord)
            )
        }
    }
    const pagesVisited = pageNumber * perPage;
    const pageCount = Math.ceil(orderedItems.length/perPage);
    const getPostItems = orderedItems.slice(pagesVisited, pagesVisited + perPage)
    .map(item => {
            return item.department === "Patrimonio" && item.showOnWeb === true? 
            <div onClick={setPosition} className='patrimonial__list__item' key={item._id} details={item}>
                <Carousel 
                    className='patrimonial__list__item__images'
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
                <Link onClick={() => {setState({item:item})}}  to={generatePath(routes.ItemPatrimonial, {id:item._id})}>
                    <div className='patrimonial__list__item__text'>
                        {item.adType.length === 1 ? 
                            <h2 className='patrimonial__list__item__text__price'>{item.adType.map(type => 
                                type==='Venta' && item.sale.saleShowOnWeb ? 
                                `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                type==='Alquiler' && item.rent.rentShowOnWeb ?
                                `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                            </h2>
                            :
                            <h2 className='patrimonial__list__item__text__prices'>
                                {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                            </h2>
                        }   
                        <h2 className='patrimonial__list__item__text__title'>{item.title}</h2>
                        <h3 className='patrimonial__list__item__text__street'>{item.webSubtitle}</h3>
                        <ul className='patrimonial__list__item__text__characteristics'>
                            {item.buildSurface !== 0 ?
                                <li><span><img src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                            :null}
                            {item.quality.jobPositions !== 0 ?
                                <li><span><img src={job} alt='puestos de trabajo'/></span>{item.quality.jobPositions}</li>
                            :null}
                            {item.quality.parking !== 0 ?
                                <li className='patrimonial__list__item__text__characteristics__car'><span><img src={parking} alt='plazas parking'/></span>{item.quality.parking}</li>
                            :null}
                            {item.adReference !== 0 ?
                                <li><span><img src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                            :null}
                        </ul>
                        <div className='patrimonial__list__item__text__clickable'></div>
                    </div>
                </Link>
            </div> : null
    })

    useEffect(() => {
        if (state.length>=1) {
            window.localStorage.setItem(
                'storedState', JSON.stringify(state)
            )
        }
    },[state])

    useEffect(() => {
        window.localStorage.removeItem('storedState2')
    },[])

    useEffect (() => {
        const localState = window.localStorage.getItem('storedState')
        let Items = []
        if (localState) {
            const itemList = JSON.parse(localState)
            itemList.map(item => 
               Items.push(item) 
            )
            const array = Object.values(Items)
            const sortArray = (a, b) => {
                if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                if (a.sale.saleValue > b.sale.saleValue) {return -1;}
                return 0
            }
            let orderedArrayPrice = array.sort(sortArray);
            Items=orderedArrayPrice
        }
        setOrderedItems(Items)
    },[])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4])-1)
        for(let i = 0; i<pageCount; i++){
            elements.push(
                <li className='patrimonial__pagination__list__item'><a href={`https://modest-darwin-2e96d1.netlify.app/patrimonial/${i+1}`}>{i+1}</a></li>
            )
        }
        setPagElements(elements)
    },[pageCount])

    useEffect (() => {
        if (filteredState.length>0) {
            setOrderedItems(filteredState)
        }
    },[filteredState])

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

    const onPrice = () => {
        const array = Object.values(orderedItems)
        const sortArray = (a, b) => {
            if (a.sale.saleValue < b.sale.saleValue) {return 1;}
            if (a.sale.saleValue > b.sale.saleValue) {return -1;}
            return 0
        }
        let orderedArrayPrice = array.sort(sortArray);
        setOrderedItems(orderedArrayPrice);
        setOrderItems (!orderItems)
    }

    const onDate = () => {
        const array = Object.values(orderedItems)
        const sortArray = (a, b) => {
            if (a.createdAt < b.createdAt) {return 1;}
            if (a.createdAt > b.createdAt) {return -1;}
            return 0
        }
        let orderedArrayDate = array.sort(sortArray);
        setOrderedItems(orderedArrayDate);
        setOrderItems (!orderItems);
    }

    const toggleOrderItems = () => {
        setOrderItems (!orderItems)
    }

    window.onmousemove = function (e){
        var y = e.pageY
        setCoord(y)
    }

    return (
        <div className='patrimonial'>
            <Header/>
            {orderedItems.length > 0 ?
                <div>
                    <h1 className='patrimonial__title'>Patrimonio</h1>
                    <div className='patrimonial__buttons'>
                        <button onClick={toggleFilter} className='patrimonial__buttons__filter'><img src={filterImg} alt='boton filtro'/> Filtros</button>
                        <div className='patrimonial__buttons__order'>
                        <button onClick={toggleOrderItems} className='patrimonial__buttons__order__title'>Ordenar por <img src={order} alt='boton ordenar por'/></button>
                            <ul className={orderItems === false ? 'patrimonial__buttons__order__listDisabled' : 'patrimonial__buttons__order__list'}>
                                <li onClick={onPrice} className='patrimonial__buttons__order__list__first'>Precio más alto</li>
                                <li onClick={onDate}>Más reciente</li>
                            </ul>
                        </div>
                    </div>
                    <div className='patrimonial__list'>
                        {getPostItems}
                    </div>
                    <div className='patrimonial__pagination'>
                        <ul className='patrimonial__pagination__list'>
                            <li className='patrimonial__pagination__list__item'><a className='patrimonial__pagination__list__item__back' href={`https://modest-darwin-2e96d1.netlify.app/patrimonial/${pageNumber}`}> <img src={mayor} alt='simbolo mayor' /> </a></li>
                            {pagElements}
                            <li className='patrimonial__pagination__list__item'><a className='patrimonial__pagination__list__item__next' href={`https://modest-darwin-2e96d1.netlify.app/patrimonial/${pageNumber+2}`}> <img src={mayor} alt='simbolo menor' /> </a></li>
                        </ul>
                    </div>
                    <div className='patrimonial__zoneMap'>
                        <NavLink to={routes.FilterPatrimonial} className='patrimonial__zoneMap__button'><span><img src={zoneMap} alt='boton mapa'/></span> Abrir el mapa de zonas</NavLink>
                    </div>
                    <ContactIndex/>
                </div>
            :
            <div>
            <div className='patrimonial__empty'>
                <h2 className='patrimonial__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                <Link className='patrimonial__empty__button' to={routes.FilterPatrimonial}>Volver al mapa</Link>            
            </div>
            </div>
            }
        </div>
    )
}

export default Patrimonio
