import React, { useEffect,useState, useContext} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./residential.scss"
import routes from '../../../config/routes';
import { Link, generatePath, NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Slider } from '@mui/material';
import Header from '../../common/Header/Header';
import banera from '../../../assets/SVG/mobile/anuncios/anuncios_banos.svg';
import habit from '../../../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg';
import piscina from '../../../assets/SVG/mobile/anuncios/anuncios_piscina.svg';
import refer from '../../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../../assets/SVG/mobile/anuncios/anuncios_spfcie.svg';
import filterImg from '../../../assets/SVG/mobile/comun/iconoFiltros.svg';
import order from '../../../assets/SVG/mobile/comun/flechaOrdenar.svg';
import zoneMap from '../../../assets/SVG/mobile/anuncios/anuncios_mapa.svg';
import carretera1 from '../../../assets/maps/mapaR/carreteras/carretera1.svg';
import carretera2 from '../../../assets/maps/mapaR/carreteras/carretera2.svg';
import carretera3 from '../../../assets/maps/mapaR/carreteras/carretera3.svg';
import carretera4 from '../../../assets/maps/mapaR/carreteras/carretera4.svg';
import carretera5 from '../../../assets/maps/mapaR/carreteras/carretera5.svg';
import carretera6 from '../../../assets/maps/mapaR/carreteras/carretera6.svg';
import carretera62 from '../../../assets/maps/mapaR/carreteras/carretera6-2.svg';
import carretera7 from '../../../assets/maps/mapaR/carreteras/carretera7.svg';
import carretera8 from '../../../assets/maps/mapaR/carreteras/carretera8.svg';
import alam from '../../../assets/maps/mapaR/barrios/alam.svg';
import alma from '../../../assets/maps/mapaR/barrios/alma.svg';
import arav from '../../../assets/maps/mapaR/barrios/arav.svg';
import cond from '../../../assets/maps/mapaR/barrios/cond.svg';
import cort from '../../../assets/maps/mapaR/barrios/cort.svg';
import enci from '../../../assets/maps/mapaR/barrios/enci.svg';
import finc from '../../../assets/maps/mapaR/barrios/finc.svg';
import flori from '../../../assets/maps/mapaR/barrios/flori.svg';
import fuen1 from '../../../assets/maps/mapaR/barrios/fuen1.svg';
import fuen2 from '../../../assets/maps/mapaR/barrios/fuen2.svg';
import hisp from '../../../assets/maps/mapaR/barrios/hisp.svg';
import jero from '../../../assets/maps/mapaR/barrios/jero.svg';
import just from '../../../assets/maps/mapaR/barrios/just.svg';
import mira from '../../../assets/maps/mapaR/barrios/mira.svg';
import moal from '../../../assets/maps/mapaR/barrios/moal.svg';
import mocl from '../../../assets/maps/mapaR/barrios/mocl.svg';
import mora from '../../../assets/maps/mapaR/barrios/mora.svg';
import nuev from '../../../assets/maps/mapaR/barrios/nuev.svg';
import pala from '../../../assets/maps/mapaR/barrios/pala.svg';
import prla from '../../../assets/maps/mapaR/barrios/prla.svg';
import puer from '../../../assets/maps/mapaR/barrios/puer.svg';
import rosa from '../../../assets/maps/mapaR/barrios/rosa.svg';
import sala from '../../../assets/maps/mapaR/barrios/sala.svg';
import somo from '../../../assets/maps/mapaR/barrios/somo.svg';
import vald1 from '../../../assets/maps/mapaR/barrios/vald1.svg';
import vald2 from '../../../assets/maps/mapaR/barrios/vald2.svg';
import viso from '../../../assets/maps/mapaR/barrios/viso.svg';
import { generalContext } from '../../../providers/generalProvider';
import { getResidential } from '../../../api-requests/requests';
import lupa from '../../../assets/SVG/mobile/comun/filtros_lupa.svg';
import mayor from '../../../assets/SVG/web/comunes/mayor.svg';
import cerrarFiltro from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import ContactIndex from '../../common/ContactInfo/ContactIndex';
import supP from '../../../assets/SVG/web/anuncios/anuncios_superficieP.svg';
import parking from '../../../assets/SVG/web/anuncios/anuncios_garaje.svg';

const Residential = () => {
    const [orderedItems, setOrderedItems] = useState([])
    const [refItem, setRefItem] = useState([])
    const [perPage] = useState(30);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagElements, setPagElements] = useState();

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    const [ref, setRef] = useState('');
    const [itemRef, setItemRef] = useState ('initial');
    const [maxPrice, setMaxPrice] = useState(99999999.9)
    const [price, setPrice] = useState([0.1,maxPrice]);
    const [maxSurface, setMaxSurface] = useState(99999999.9);
    const [surface, setSurface] = useState([0.1,maxSurface]);

    const [filter, setFilter] = useState (false);
    const [disableButton, setDisableButton] = useState(false);
    const [disableSliders, setDisableSliders] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [orderItems, setOrderItems] = useState(false);
    const [state2, setState2] = useState([])
    const [state, setState] = useContext(generalContext);

    const [coord, setCoord] = useState(0)

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
        return item.department === "Residencial" && item.showOnWeb === true? 
            <div onClick={setPosition} className='residential__list__item' key={item._id} >
                {item.gvOperationClose === 'Alquilado' || item.gvOperationClose === 'Vendido' ?
                    <div className='wrapper'>
                        <div className='residential__list__item__status'>
                            <p>{item.gvOperationClose}</p>
                        </div>
                        <Carousel 
                            className='residential__list__item__images'
                            showArrows={true}
                            showThumbs={false}
                            infiniteLoop={true}
                            showStatus={false}
                        >
                            <img src={item.images.main} alt={item.title}/>
                            {item.images.others.map((image)=> (
                                <img key={image} src={image} alt={item.title}/>
                            ))}
                        </Carousel>
                        <div>
                            <div className='residential__list__item__text'>
                                {item.adType.length === 1 ? 
                                    <h2 className='residential__list__item__text__price'>{item.adType.map(type => 
                                        type==='Venta' && item.sale.saleShowOnWeb ? 
                                        `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                        type==='Alquiler' && item.rent.rentShowOnWeb ?
                                        `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                    </h2>
                                    :
                                    <h2 className='residential__list__item__text__prices'>
                                        {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                        {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                    </h2>
                                }                        
                                <h2 className='residential__list__item__text__title'>{item.title}</h2>
                                <h3 className='residential__list__item__text__street'>{item.webSubtitle}</h3>
                                <ul className='residential__list__item__text__characteristics'>
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
                                        <li className='residential__list__item__text__characteristics__car'><span><img src={parking} alt='plazas parking'/></span>{item.quality.parking}</li>
                                    :null}
                                    {item.quality.outdoorPool !== 0 ?
                                        <li><span><img src={piscina} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                    :null}
                                    {item.adReference !== 0 ? 
                                        <li><span><img src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                    :null}
                                </ul>
                                <div className='residential__list__item__text__blocker'></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Carousel 
                            className='residential__list__item__images'
                            showArrows={true}
                            showThumbs={false}
                            infiniteLoop={true}
                            showStatus={false}
                        >
                            <img src={item.images.main} alt={item.title}/>
                            {item.images.others.map((image)=> (
                                <img key={image} src={image} alt={item.title}/>
                            ))}
                        </Carousel>
                        <Link onClick={() => {setState({item:item})}}  to={generatePath(routes.ItemResidential, {id:item._id})}>
                            <div className='residential__list__item__text'>
                                {item.adType.length === 1 ? 
                                    <h2 className='residential__list__item__text__price'>{item.adType.map(type => 
                                        type==='Venta' && item.sale.saleShowOnWeb===true && item.sale.saleValue !== 0 ? 
                                        `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                        type==='Alquiler' && item.rent.rentShowOnWeb===true && item.rent.rentValue !== 0 ?
                                        `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                    </h2>
                                    :
                                    <h2 className='residential__list__item__text__prices'>
                                        {item.sale.saleShowOnWeb && item.sale.saleValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                        {item.rent.rentShowOnWeb && item.rent.rentValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                    </h2>
                                }                        
                                <h2 className='residential__list__item__text__title'>{item.title}</h2>
                                <h3 className='residential__list__item__text__street'>{item.webSubtitle}</h3>
                                <ul className='residential__list__item__text__characteristics'>
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
                                    {item.quality.outdoorPool !== 0 ?
                                        <li><span><img src={piscina} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                    :null}
                                    {item.quality.parking !== 0 ?
                                        <li className='residential__list__item__text__characteristics__car'><span><img src={parking} alt='plazas parking'/></span>{item.quality.parking}</li>
                                    :null}
                                    {item.adReference !== 0 ? 
                                        <li><span><img src={refer} alt='referencia'/></span><p> Ref {item.adReference}</p></li>
                                    :null}
                                </ul>
                                <div className='residential__list__item__text__clickable'></div>
                            </div>
                        </Link>
                    </div>
                }
            </div> : null
    })
    
    useEffect(() => {
        if (state.length>=1) {
            let reducedState = []
            state.map(item => 
                item.department === 'Residencial' && item.showOnWeb === true ? reducedState.push(item) : null
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
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        let residentialItems = []
        if (localState) {
            const itemList = JSON.parse(localState)
            const SOR = JSON.parse(storedSOR)
            itemList.map(item => 
                item.department === 'Residencial' && item.showOnWeb === true ? residentialItems.push(item) : null
            )
            const array = Object.values(residentialItems)
            const sortArray = (a, b) => {
                if(SOR === 'Alquiler'){
                    if (a.rent.rentValue < b.rent.rentValue) {return 1;}
                    if (a.rent.rentValue > b.rent.rentValue) {return -1;}
                }else {
                    if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                    if (a.sale.saleValue > b.sale.saleValue) {return -1;}
                }
                return 0
            }
            let orderedArrayPrice = array.sort(sortArray);
            residentialItems=orderedArrayPrice
        }
        setOrderedItems(residentialItems)
    },[])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4])-1)
        for(let i = 0; i<pageCount; i++){
            elements.push(
                <li className={i+1 === parseInt(splitedLocation[4]) ? 'residential__pagination__list__item currentPage' : 'residential__pagination__list__item'}><a href={`https://gvre.es/residential/${i+1}`}>{i+1}</a></li>
            )
        }
        setPagElements(elements)
    },[pageCount])

    useEffect(() => {
        getResidential().then(items=>{
            setState2(items)
        })
    },[])

    useEffect(()=> {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || extrasActive === true || ref!==''){
            setDisableButton(true)
        }else{
            setDisableButton(false)
        }
    },[ref, selectedActive, saleOrRentActive, typeHouseActive, extrasActive])

    useEffect(() => {
        if (state2.length > 0) {
            state2.map(itemState => {
                if (ref === itemState.adReference) {
                    setItemRef(itemState.adReference)
                    setRefItem([itemState])
                }
                return(itemState)
            })
        }
        if (ref!== '') {
            setVerLupa(false)
        }else{
            setVerLupa(true)
        }    
    },[ref, state2])

    useEffect(() => {
        if(filter===true){
            let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
            if (saleOrRent[0]==='Alquiler'){
                if (label[0].innerHTML==='0,1 €/mes'){
                    label[0].innerHTML='min'
                }
                if (label[1].innerHTML==='99.999.999,9 €/mes'){
                    label[1].innerHTML='max'
                }
            }
            if (saleOrRent[0]==='Venta'){
                if (label[0].innerHTML==='0,1 €'){
                    label[0].innerHTML='min'
                }
                if (label[1].innerHTML==='99.999.999,9 €'){
                    label[1].innerHTML='max'
                }
            }
            if(saleOrRent.length===0){
                setMaxPrice(99999999.9)
                setMaxSurface(99999999.9)
                setPrice([0.1, 99999999.9])
                setSurface([0.1, 99999999.9])
                setDisableSliders(false)
            }
            if (label[0].innerHTML==='0,1 €/mes'){
                label[0].innerHTML='min'
            }
            if (label[1].innerHTML==='99.999.999,9 €/mes'){
                label[1].innerHTML='max'
            }
            if (label[3].innerHTML==='99.999.999,9 m2'){
                label[3].innerHTML='max'
            }
            if (label[2].innerHTML==='0,1 m2'){
                label[2].innerHTML='min'
            }
        }
    },[saleOrRent, filter, disableSliders])

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
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        const SOR = JSON.parse(storedSOR)
        const array = Object.values(orderedItems)
        const sortArray = (a, b) => {
            if(SOR === 'Alquiler'){
                if (a.rent.rentValue < b.rent.rentValue) {return 1;}
                if (a.rent.rentValue > b.rent.rentValue) {return -1;}
            }else {
                if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                if (a.sale.saleValue > b.sale.saleValue) {return -1;}
            }
        }
        let orderedArrayPrice = array.sort(sortArray);
        setOrderedItems(orderedArrayPrice)
        setOrderItems (!orderItems);
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
        setOrderItems (!orderItems);
    }

    const toggleActive = (e) => {
        if (e.currentTarget.className === e.currentTarget.id){
            e.currentTarget.className =`${e.currentTarget.className} active`
            selected.push(e.currentTarget.name)
        } else {
            e.currentTarget.className =`${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSelected = selected.filter(item => item !== elementName)
            selected.splice(0, selected.length, ...newSelected)
        }
        if (selected.length !== 0) {
            setSelectedActive(true)
        }else{
            setSelectedActive(false)
        }
    }
    const selectSaleOrRent = (e) => {
        if (e.currentTarget.className === e.currentTarget.id){
            e.currentTarget.className =`${e.currentTarget.className} activeButton`
            saleOrRent.push(e.currentTarget.name)
        } else {
            e.currentTarget.className =`${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSaleOrRent = saleOrRent.filter(item => item !== elementName)
            saleOrRent.splice(0, saleOrRent.length, ...newSaleOrRent)
        }
        if (saleOrRent.length !== 0) {
            setSaleOrRentActive(true)
        }else{
            setSaleOrRentActive(false)
        }
        if (saleOrRent.length>0) {
            saleOrRent.map(item => {
                if (item === 'Venta') {
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    orderedItems.map(item => {
                        if (item.showOnWeb === true) {
                            priceArray.push(item.sale.saleValue);
                            surfaceArray.push(item.buildSurface);
                        }
                        return (item)
                    })
                    priceArray.sort(function (a, b) {
                        return b - a
                    })
                    surfaceArray.sort(function (a, b) {
                        return b - a
                    })
                    setMaxPrice(priceArray[0])
                    setPrice([0,priceArray[0]])
                    setMaxSurface(surfaceArray[0])
                    setSurface([0,surfaceArray[0]])
                }else if (item ==='Alquiler'){
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    orderedItems.map(item => {
                        if(item.showOnWeb === true){
                            priceArray.push(item.rent.rentValue);
                            item.adType.map(itemType => {
                                if (itemType === 'Alquiler'){
                                    surfaceArray.push(item.buildSurface);
                                    return(itemType)
                                }
                                return(item)
                            })
                        }
                        return(item)
                    })
                    priceArray.sort(function (a, b) {
                        return b - a
                    })
                    surfaceArray.sort(function (a, b) {
                        return b - a
                    })
                    setMaxPrice(priceArray[0])
                    setPrice([0,priceArray[0]])
                    setMaxSurface(surfaceArray[0])
                    setSurface([0,surfaceArray[0]])
                }
                return (item)
            })
        }
        if (saleOrRent.length===2 || saleOrRent.length===0){
            setDisableSliders(!disableSliders)
            setMaxPrice(99999999.9)
            setPrice([0.1, 99999999.9]);
            setMaxSurface(99999999.9)
            setSurface([0.1,99999999.9]);
        }
    }
    const addType = (e) => {
        if (e.currentTarget.className === e.currentTarget.id){
            e.currentTarget.className =`${e.currentTarget.className} activeButton`
            typeHouse.push(e.currentTarget.name)
        } else {
            e.currentTarget.className =`${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newType = typeHouse.filter(item => item !== elementName)
            typeHouse.splice(0, typeHouse.length, ...newType)
        }
        if (typeHouse.length !== 0) {
            setTypeHouseActive(true)
        }else{
            setTypeHouseActive(false)
        }
    }
    const addExtra = (e) => {
        if (e.currentTarget.className === e.currentTarget.id){
            e.currentTarget.className =`${e.currentTarget.className} activeButton`
            extras.push(e.currentTarget.name)
        } else {
            e.currentTarget.className =`${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newExtra = extras.filter(item => item !== elementName)
            extras.splice(0, extras.length, ...newExtra)
        }
        if (extras.length !== 0) {
            setExtrasActive(true)
        }else{
            setExtrasActive(false)
        }
    }

    const handlePriceInput = (e, data1) => {
        setPrice(data1);
    };
    const handleSurfaceInput = (e, data2) => {
        setSurface(data2);
    };
    const addRef = (e) => {
        setRef (e.currentTarget.value)
    }

    const compareStates = () => {

        let actualizeState = []
        if (saleOrRent.length > 0) {
            state2.map(itemState => 
                saleOrRent.map(itemSale => 
                    itemState.adType.map(itemAd => 
                        itemSale===itemAd? actualizeState.push(itemState) : null
                    )
                )
            )
        }
        let actualizeState2 = []
        if (typeHouse.length>0){
            state2.map(itemState => 
                typeHouse.map(itemType => 
                    itemState.adBuildingType.map(itemAd => 
                        itemType === itemAd ? actualizeState2.push(itemState): null
                    )
                )
            )
        }
        let actualizeState3 = []
        if (selected.length>0){
            state2.map(itemState => 
                selected.map(itemType => 
                    itemState.zone.map(itemAd => {
                        if (itemAd.zone !== 'Residencial' && itemAd.zone !== 'Patrimonial'){
                            if (itemType === itemAd.zone) {
                                actualizeState3.push(itemState)
                            }
                        }else {
                            if (itemType === itemAd.name) {
                                actualizeState3.push(itemState)
                            }
                        }
                        return(itemAd)
                    })
                )
            )
            let filtered = actualizeState3.filter ((item, index) => {
                return actualizeState3.indexOf(item) === index
            })
            actualizeState3=filtered  
        }
        let actualizeState4 = []
        if (extras.length>0){
            let pool = [];
            let park = [];
            let terr = [];
            state2.map(itemState => 
                extras.map(extraItem => {
                    if (itemState.quality.others.swimmingPool === true && extraItem === 'swimmingPool') {
                        pool.push(itemState)
                    }else if (itemState.quality.others.garage === true && extraItem === 'garage') {
                        park.push(itemState)
                    }else if (itemState.quality.others.terrace === true && extraItem === 'terrace') {
                        terr.push(itemState)
                    }
                    return(extraItem)
                })
            )
            if (pool.length>0 && park.length===0 && terr.length===0){
                actualizeState4=pool
            }
            if (pool.length===0 && park.length>0 && terr.length===0){
                actualizeState4=park
            }
            if (pool.length===0 && park.length===0 && terr.length>0){
                actualizeState4=terr
            }
            if (pool.length>0 && park.length>0 && terr.length===0){
                pool.map(itemPool=> 
                    park.map(itemPark=> itemPool._id === itemPark._id ? actualizeState4.push(itemPool) : null))
            }
            if (pool.length>0 && park.length===0 && terr.length>0){
                pool.map(itemPool=> 
                    terr.map(itemTerr=> itemPool._id === itemTerr._id ? actualizeState4.push(itemPool) : null))
            }
            if (pool.length===0 && park.length>0 && terr.length>0){
                park.map(itemPark=> 
                    terr.map(itemTerr=> itemPark._id === itemTerr._id ? actualizeState4.push(itemPark) : null))
            }
            if (pool.length>0 && park.length>0 && terr.length>0){
                let AB = []
                pool.map(itemPool=> 
                    park.map(itemPark=> itemPool._id === itemPark._id ? AB.push(itemPool) : null))
                AB.map(itemAB => 
                    terr.map(itemTerr => itemAB._id === itemTerr._id ? actualizeState4.push(itemAB) : null))
            }
        }

        let finalState = [];
        ///////////////////////////4///////////////////////
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length>0 && actualizeState4.length>0){
            let AB = [];
            let CD = [];
            actualizeState.map(itemA => 
                actualizeState2.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null));
            actualizeState3.map(itemC => 
                actualizeState4.map(itemD => itemC._id === itemD._id ? CD.push(itemC) : null));
            AB.map(itemAB=>
                CD.map(itemCD=> itemAB._id === itemCD._id ? finalState.push(itemAB) : null));
        }
        /////////////////////////3/////////////////////////
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length>0 && actualizeState4.length===0){
            let AB = []
            actualizeState.map(itemA => 
                actualizeState2.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null))
            AB.map(itemAB => 
                actualizeState3.map(itemC => itemAB._id === itemC._id ? finalState.push(itemAB) : null))
        }
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length===0 && actualizeState4.length>0){
            let AB = []
            actualizeState.map(itemA => 
                actualizeState2.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null))
            AB.map(itemAB => 
                actualizeState4.map(itemC => itemAB._id === itemC._id ? finalState.push(itemAB) : null))
        }
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length>0 && actualizeState4.length>0){
            let AB = []
            actualizeState.map(itemA => 
                actualizeState3.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null))
            AB.map(itemAB => 
                actualizeState4.map(itemC => itemAB._id === itemC._id ? finalState.push(itemAB) : null))
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length>0 && actualizeState4.length>0){
            let AB = []
            actualizeState.map(itemA => 
                actualizeState2.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null))
            AB.map(itemAB => 
                actualizeState4.map(itemC => itemAB._id === itemC._id ? finalState.push(itemAB) : null))
        }
        //////////////////////2////////////////////////////
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length===0 && actualizeState4.length===0){
            actualizeState.map(itemA => 
                actualizeState2.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length>0 && actualizeState4.length===0){
            actualizeState.map(itemA => 
                actualizeState3.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length>0 && actualizeState4.length===0){
            actualizeState2.map(itemA => 
                actualizeState3.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length===0 && actualizeState4.length>0){
            actualizeState.map(itemA => 
                actualizeState4.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length===0 && actualizeState4.length>0){
            actualizeState2.map(itemA => 
                actualizeState4.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length===0 && actualizeState2.length===0 && actualizeState3.length>0 && actualizeState4.length>0){
            actualizeState3.map(itemA => 
                actualizeState4.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        ////////////////1///////////////////////
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length===0 && actualizeState4.length===0){
            finalState = actualizeState
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length===0 && actualizeState4.length===0){
            finalState = actualizeState2
        }
        if (actualizeState.length===0 && actualizeState2.length===0 && actualizeState3.length>0 && actualizeState4.length===0){
            finalState = actualizeState3
        }
        if (actualizeState.length===0 && actualizeState2.length===0 && actualizeState3.length===0 && actualizeState4.length>0){
            finalState = actualizeState4
        }

        ////////////////////////control////////////////////
        if (selected.length>0 && actualizeState3.length === 0){
            finalState=[]
        }

        if (finalState.length>0) {
            let slidersFilter = []
            finalState.map(item => {
                item.adType.map(type => {
                    if (type !== 'Alquiler' ){
                        saleOrRent.map(itemSR => {
                            if (itemSR !== 'Alquiler'){
                                if (item.sale.saleValue >= price[0] && item.sale.saleValue <= price[1] && item.buildSurface >= surface[0] && item.buildSurface <= surface[1]) {
                                    slidersFilter.push(item)
                                }
                            }
                            return(itemSR)
                        })
                    }
                    else if(type === 'Alquiler'){
                        saleOrRent.map(itemSR => {
                            if(itemSR ==='Alquiler') {
                                if (item.rent.rentValue >= price[0] && item.rent.rentValue <= price[1] && item.buildSurface >= surface[0] && item.buildSurface <= surface[1]) {
                                    slidersFilter.push(item)
                                }
                            }
                            return(itemSR)
                        })
                    }
                    return(type)
                })
                return(item)
            })
            if (slidersFilter.length>0){
                finalState = slidersFilter
            }
            let filtered = finalState.filter ((item, index) => {
                return finalState.indexOf(item) === index
            })
            setOrderedItems(filtered)    
        }
        if (finalState.length===0) {
            setOrderedItems([])
        }
        if (refItem.length>0){
            setOrderedItems(refItem)
        }
        setFilter(!filter)

        if (saleOrRent.length === 1){
            saleOrRent.map(item => {
                window.localStorage.setItem(
                    'saleOrRentStored', JSON.stringify(item)
                )    
                return(item)        
            })
        }
        
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        const SOR = JSON.parse(storedSOR)
        const array = Object.values(finalState)
        const sortArray = (a, b) => {
            if(SOR === 'Alquiler'){
                if (a.rent.rentValue < b.rent.rentValue) {return 1;}
                if (a.rent.rentValue > b.rent.rentValue) {return -1;}
            }else {
                if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                if (a.sale.saleValue > b.sale.saleValue) {return -1;}
            }
        }
        let orderedArrayPrice = array.sort(sortArray);
        setOrderedItems(orderedArrayPrice)

        window.scroll(
            {top:0}
        )

        saleOrRent.length=0;
        extras.length=0;
        typeHouse.length=0;
        selected.length=0;
        setSelectedActive(false)
    }

    const toggleFilter = () => {
        setFilter (!filter)
    }

    const toggleOrderItems = () => {
        setOrderItems (!orderItems)
    }

    window.onmousemove = function (e){
        var y = e.pageY
        setCoord(y)
    }

    const deletePosition = () => {
        window.localStorage.removeItem('storedPosition2')
    }

    const seeAll = () => {
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        const SOR = JSON.parse(storedSOR)
        const array = Object.values(state2)
        const sortArray = (a, b) => {
            if(SOR === 'Alquiler'){
                if (a.rent.rentValue < b.rent.rentValue) {return 1;}
                if (a.rent.rentValue > b.rent.rentValue) {return -1;}
            }else {
                if (a.sale.saleValue < b.sale.saleValue) {return 1;}
                if (a.sale.saleValue > b.sale.saleValue) {return -1;}
            }
        }
        let finalArray = []
        array.sort(sortArray).map(item=>
            item.department === 'Residencial' ? finalArray.push(item) : null
        );
        setOrderedItems(finalArray)
        setFilter (!filter)
        window.scroll(
            {top:0}
        )
    }

    return (
        <div className='residential'>
            <Header/>
            {orderedItems.length > 0 ?
                <div>
                    {filter === true ? 
                        <div className='residential__filter'>
                            <div className='residential__filter__position'>
                                <h2 className='residential__filter__position__title'>Zonas <span onClick={toggleFilter}><img src={cerrarFiltro} alt='cerrar'/></span></h2>
                                <h3 className='residential__filter__position__subTitle'>Seleccione una o varias zonas</h3>
                                <div className='residential__filter__position__mapContainer'>
                                    <div className='residential__filter__position__mapContainer__mapa'>
                                        <input type='image' className='c1' src={carretera1} alt='componente mapa' />
                                        <input type='image' className='c2' src={carretera2} alt='componente mapa' />
                                        <input type='image' className='c3' src={carretera3} alt='componente mapa' />
                                        <input type='image' className='c4' src={carretera4} alt='componente mapa' />
                                        <input type='image' className='c5' src={carretera5} alt='componente mapa' />
                                        <input type='image' className='c6' src={carretera6} alt='componente mapa' />
                                        <input type='image' className='c62' src={carretera62} alt='componente mapa' />
                                        <input type='image' className='c7' src={carretera7} alt='componente mapa' />
                                        <input type='image' className='c8' src={carretera8} alt='componente mapa' />
                                        <button name='Monteclaro' onClick={toggleActive} id='mocl' className='mocl'>
                                            <input type='image' src={mocl} alt='componente mapa' />
                                            <p>Monte <br/> Claro</p>
                                            <div></div>
                                        </button>
                                        <button type='image' onClick={toggleActive} name='Montealina' id='moal' className='moal'>
                                            <input type='image' src={moal} alt='componente mapa' />
                                            <p>Monte<br/>Alina</p>
                                        </button>
                                        <button onClick={toggleActive} name='Prado Largo' id='prla' className='prla'>
                                            <input type='image' src={prla} alt='componente mapa' />
                                            <p>Prado<br/>Largo</p>
                                        </button>
                                        <button onClick={toggleActive} name='Las Encinas' id='enci' className='enci'>
                                            <input type='image'src={enci} alt='componente mapa' />
                                            <p>Las Encinas</p>
                                        </button>
                                        <button onClick={toggleActive} name='Alamo de Bulanas' id='alam' className='alam'>
                                            <input type='image' src={alam} alt='componente mapa' />
                                            <p>Alamos de<br/>Bularas</p>
                                        </button>
                                        <button onClick={toggleActive} name='La Florida' id='flori' className='flori'>
                                            <input type='image' src={flori} alt='componente mapa' />
                                            <p>La Florida</p>
                                        </button>
                                        <button onClick={toggleActive} name='La Finca' id='finc' className='finc'>
                                            <input type='image' src={finc} alt='componente mapa' />
                                            <p>La Finca</p>
                                        </button>
                                        <button onClick={toggleActive} name='Somosaguas' id='somo' className='somo'>
                                            <input type='image' src={somo} alt='componente mapa' />
                                            <p>Somosaguas</p>
                                        </button>
                                        <button onClick={toggleActive} name='Aravaca' id='arav' className='arav'>
                                            <input type='image' src={arav} alt='componente mapa' />
                                            <p>Aravaca</p>
                                        </button>
                                        <button onClick={toggleActive} name='Valdemarín' id='vald1' className='vald1'>
                                            <input type='image' src={vald1} alt='componente mapa'/>
                                            <input type='image' className='vald2' src={vald2} alt='componente mapa'/>
                                            <p>Valdemarín</p>
                                        </button>
                                        <button onClick={toggleActive} name='Colonia Fuentelarreyna' id='fuen1' className='fuen1'>
                                            <input type='image' src={fuen1} alt='componente mapa' />
                                            <input type='image' className='fuen2' src={fuen2} alt='componente mapa' />
                                            <p>Fuentelarreina</p>
                                        </button>
                                        <button onClick={toggleActive} name='Puerta de Hierro' id='puer' className='puer' >
                                            <input type='image' src={puer} alt='componente mapa' />
                                            <p>Puerta de <br/>Hierro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Rosales' id='rosa' className='rosa'>
                                            <input type='image' src={rosa} alt='componente mapa' />
                                            <p>Rosales</p>
                                        </button>
                                        <button onClick={toggleActive} name='Palacio' id='pala' className='pala'>
                                            <input type='image' src={pala} alt='componente mapa' />
                                            <p>Palacio</p>
                                        </button>
                                        <button onClick={toggleActive} name='Mirasierra' id='mira' className='mira'>
                                            <input type='image' src={mira} alt='componente mapa' />
                                            <p>Mirasierra</p>
                                        </button>
                                        <button onClick={toggleActive} name='Almagro' id='alma' className='alma'>
                                            <input type='image' src={alma} alt='componente mapa' />
                                            <p>Almagro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Justicia' id='just' className='just'>
                                            <input type='image' src={just} alt='componente mapa' />
                                            <p>Justicia</p>
                                        </button>
                                        <button onClick={toggleActive} name='Cortes' id='cort' className='cort'>
                                            <input type='image' src={cort} alt='componente mapa' />
                                            <p>Cortes</p>
                                        </button>
                                        <button onClick={toggleActive} name='Nueva España - Hispanoamérica' id='nuev' className='nuev'>
                                            <input type='image' src={nuev} alt='componente mapa' />
                                            <p>Nueva España</p>
                                        </button>
                                        <button onClick={toggleActive} name='Nueva España - Hispanoamérica' id='hisp' className='hisp'>
                                            <input type='image' src={hisp} alt='componente mapa' />
                                            <p>Hispano <br/> América</p>
                                        </button>
                                        <button onClick={toggleActive} name='El Viso' id='viso' className='viso'>
                                            <input type='image' src={viso} alt='componente mapa' />
                                            <p>El Viso</p>
                                        </button>
                                        <button onClick={toggleActive} name='Barrio Salamanca' id='sala' className='sala'>
                                            <input type='image' src={sala} alt='componente mapa' />
                                            <p>Salamanca</p>
                                        </button>
                                        <button onClick={toggleActive} name='Jerónimos' id='jero' className='jero'>
                                            <input type='image' src={jero} alt='componente mapa' />
                                            <p>Jerónimos</p>
                                        </button>
                                        <button onClick={toggleActive} name='La Moraleja' id='mora' className='mora'>
                                            <input type='image' src={mora} alt='componente mapa' />
                                            <p>Moraleja</p>
                                        </button>
                                        <button onClick={toggleActive} name='Conde de Orgaz' id='cond' className='cond'>
                                            <input type='image' src={cond} alt='componente mapa' />
                                            <p>Conde<br/>Orgaz</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='residential__filter__selectors'>
                                    <div className='residential__filter__selectors__estado'>
                                        <h3>Estado</h3>
                                        <div className='residential__filter__selectors__estado__buttons'>
                                            <button onClick={selectSaleOrRent} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                                            <button onClick={selectSaleOrRent} name='Venta' id='vent' className='vent'>Venta</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__tipo'>
                                        <h3>Tipo</h3>
                                        <div className='residential__filter__selectors__tipo__buttons'>
                                            <button onClick={addType} name='Casa' id='casa' className='casa'>Casa</button>
                                            <button onClick={addType} name='Piso' id='piso' className='piso'>Piso</button>
                                            <button onClick={addType} name='Parcela' id='parcela' className='parcela'>Parcela</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__extras'>
                                        <h3>Extras</h3>
                                        <div className='residential__filter__selectors__extras__buttons'>
                                            <button onClick={addExtra} name='swimmingPool' id='piscina' className='piscina'>Piscina</button>
                                            <button onClick={addExtra} name='garage' id='garaje' className='garaje'>Garaje</button>
                                            <button onClick={addExtra} name='terrace' id='terraza' className='terraza'>Terraza</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__sliders'>
                                        <p className={disableSliders === true ? 'residential__filter__selectors__sliders__price' : 'residential__filter__selectors__sliders__priceDisabled'}>Precio €</p>
                                        <Slider
                                            className={disableSliders === true ? 'residential__filter__selectors__sliders__price' : 'residential__filter__selectors__sliders__priceDisabled'}
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={price}
                                            onChange={handlePriceInput}
                                            valueLabelDisplay='on'
                                            disableSwap
                                            min={0}
                                            max={maxPrice}
                                            step={saleOrRent[0]==='Venta' ? 500000 : 500}
                                            valueLabelFormat={saleOrRent[0] === 'Venta' ? value => `${new Intl.NumberFormat('de-DE').format(value)} €` : value => `${new Intl.NumberFormat('de-DE').format(value)} €/mes`}
                                        />
                                        <p className={disableSliders === true ? 'residential__filter__selectors__sliders__surface' : 'residential__filter__selectors__sliders__surfaceDisabled'}>Superficie m<sup>2</sup></p>
                                        <Slider
                                            className={disableSliders === true ? 'residential__filter__selectors__sliders__surface' : 'residential__filter__selectors__sliders__surfaceDisabled'}
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={surface}
                                            onChange={handleSurfaceInput}
                                            valueLabelDisplay='on'
                                            disableSwap
                                            min={0}
                                            max={maxSurface}
                                            step={50}
                                            valueLabelFormat={value => `${new Intl.NumberFormat('de-DE').format(value)} m2`}
                                        />
                                    </div>
                                    <div className='residential__filter__selectors__buscar'>
                                        {disableButton=== false ?
                                            <button className='residential__filter__selectors__buscar__all' onClick={seeAll}>Ver todos</button>
                                            :
                                            <button className='residential__filter__selectors__buscar__allDisabled'>Ver todos</button>
                                        }
                                        {disableButton===true ?
                                            <NavLink className='residential__filter__selectors__buscar__search' 
                                                onClick={compareStates} 
                                                to={generatePath(routes.Residential, {page:1})}>Buscar
                                            </NavLink>
                                            :
                                            <button className='residential__filter__selectors__buscar__searchDisabled' >Buscar</button>
                                        }  
                                    </div>
                                    <div className='residential__filter__selectors__ref'>
                                    <h4>Búsqueda por referencia</h4>
                                        <input onChangeCapture={addRef} type='text'/>
                                        <img className={verLupa === true ? 'residential__filter__selectors__ref__lupa' : 'residential__filter__selectors__ref__lupaOculta'} src={lupa} alt='lupa'/>
                                        {itemRef!==ref && ref!=='' ?<p className='residential__filter__selectors__ref__existe'>La referencia no existe</p> : null }
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    }
                    <h1 className='residential__title'>Residencial</h1>
                    <div className='residential__buttons'>
                        <button onClick={toggleFilter} className='residential__buttons__filter'><img src={filterImg} alt='boton filtro'/> Filtros</button>
                        <div className='residential__buttons__order'>
                            <button onClick={toggleOrderItems} className='residential__buttons__order__title'>Ordenar por <img src={order} alt='boton ordenar por'/></button>
                            <ul className={orderItems === false ? 'residential__buttons__order__listDisabled' : 'residential__buttons__order__list'}>
                                <li onClick={onPrice} className='residential__buttons__order__list__first'>Precio más alto</li>
                                <li onClick={onDate}>Más reciente</li>
                            </ul>
                        </div>
                    </div>
                    <div className='residential__list'>
                        {getPostItems}
                    </div>
                    <div onClick={deletePosition} className='residential__pagination'>
                        <ul className='residential__pagination__list'>
                            <li className='residential__pagination__list__item'><a className='residential__pagination__list__item__back' href={`https://gvre.es/residential/${pageNumber}`}> <img src={mayor} alt='simbolo mayor' /> </a></li>
                            {pagElements}
                            <li className='residential__pagination__list__item'><a className='residential__pagination__list__item__next' href={`https://gvre.es/residential/${pageNumber+2}`}> <img src={mayor} alt='simbolo menor' /> </a></li>
                        </ul>
                    </div>
                    <div className='residential__zoneMap'>
                        <NavLink to={routes.FilterResidential} className='residential__zoneMap__button'><span><img src={zoneMap} alt='boton mapa'/></span> Abrir el mapa de zonas</NavLink>
                    </div>
                    <ContactIndex/>
                </div>
            :
            <div className='residential__empty'>
                <h2 className='residential__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                <Link className='residential__empty__button' to={routes.FilterResidential}>Volver al mapa</Link>            
            </div>
            }
        </div>
    )
}

export default Residential
