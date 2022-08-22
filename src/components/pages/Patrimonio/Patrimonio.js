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
import { Slider } from '@mui/material';
import { getPatrimonial } from '../../../api-requests/requests';
import lupa from '../../../assets/SVG/mobile/comun/filtros_lupa.svg'
import carretera1 from '../../../assets/maps/mapaR/carreteras/carretera1.svg';
import carretera2 from '../../../assets/maps/mapaR/carreteras/carretera2.svg';
import carretera3 from '../../../assets/maps/mapaR/carreteras/carretera3.svg';
import carretera4 from '../../../assets/maps/mapaR/carreteras/carretera4.svg';
import carretera5 from '../../../assets/maps/mapaR/carreteras/carretera5.svg';
import carretera6 from '../../../assets/maps/mapaR/carreteras/carretera6.svg';
import carretera62 from '../../../assets/maps/mapaR/carreteras/carretera6-2.svg';
import carretera7 from '../../../assets/maps/mapaR/carreteras/carretera7.svg';
import carretera8 from '../../../assets/maps/mapaR/carreteras/carretera8.svg';
import carretera9 from '../../../assets/maps/mapaP/c9.svg';
import carretera10 from '../../../assets/maps/mapaP/c10.svg';
import plan1 from '../../../assets/maps/mapaP/plan1.svg';
import plan2 from '../../../assets/maps/mapaP/plan2.svg';
import vald from '../../../assets/maps/mapaP/vald.svg';
import pozu from '../../../assets/maps/mapaP/pozu.svg';
import pe from '../../../assets/maps/mapaP/pe.svg';
import secu from '../../../assets/maps/mapaP/secu.svg';
import ctba1 from '../../../assets/maps/mapaP/ctba1.svg';
import ctba2 from '../../../assets/maps/mapaP/ctba2.svg';
import cuzco1 from '../../../assets/maps/mapaP/cuzco1.svg';
import cuzco2 from '../../../assets/maps/mapaP/cuzco2.svg';
import azca from '../../../assets/maps/mapaP/azca.svg';
import cham from '../../../assets/maps/mapaP/cham.svg';
import alma from '../../../assets/maps/mapaP/alma.svg';
import cent from '../../../assets/maps/mapaP/cent.svg';
import ceba from '../../../assets/maps/mapaP/ceba.svg';
import meal from '../../../assets/maps/mapaP/meal.svg';
import juca from '../../../assets/maps/mapaP/juca.svg';
import amer from '../../../assets/maps/mapaP/amer.svg';
import amer2 from '../../../assets/maps/mapaP/amer2.svg';
import jova from '../../../assets/maps/mapaP/jova.svg';
import chama from '../../../assets/maps/mapaP/chama.svg';
import arso from '../../../assets/maps/mapaP/arso.svg';
import cana from '../../../assets/maps/mapaP/cana.svg';
import sanchi from '../../../assets/maps/mapaP/sanchi.svg';
import sanchi2 from '../../../assets/maps/mapaP/sanchi2.svg';
import sanchi3 from '../../../assets/maps/mapaP/sanchi3.svg';
import arva from '../../../assets/maps/mapaP/arva.svg';
import arva2 from '../../../assets/maps/mapaP/arva2.svg';
import jero from '../../../assets/maps/mapaR/barrios/jero.svg';
import sala from '../../../assets/maps/mapaR/barrios/sala.svg';
import viso from '../../../assets/maps/mapaR/barrios/viso.svg';
import mayor from '../../../assets/SVG/web/comunes/mayor.svg'
import cerrarFiltro from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import ContactIndex from '../../common/ContactInfo/ContactIndex';
import { Navigate} from 'react-router'
import { BarLoader } from 'react-spinners';
import { getZoneId } from '../../common/MapZones/MapZones';

const Patrimonio = () => {
    const [orderedItems, setOrderedItems] = useState([])
    const [/* refItem */, setRefItem] = useState([])
    const [perPage] = useState(30);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagElements, setPagElements] = useState();

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [ref, setRef] = useState('');
    const [itemRef, setItemRef] = useState ('initial');
    const [maxPrice, setMaxPrice] = useState(99999999.9)
    const [price, setPrice] = useState([0.1,maxPrice]);
    const [maxSurface, setMaxSurface] = useState(99999999.9);
    const [surface, setSurface] = useState([0.1,maxSurface]);

    const [filter, setFilter] = useState (false);
    const [filters, setFilters] = useState (window.localStorage.getItem('patrimonialFilters'));
    const [disableButton, setDisableButton] = useState(false);
    const [disableSliders, setDisableSliders] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [orderItems, setOrderItems] = useState(false);
    const [state2] = useState([]);
    const [state, setState] = useContext(generalContext);

    const [coord, setCoord] = useState(0)
    const [param, setParam] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isFound, setIsFound] = useState(false);

    const getTypeHouse = () => {
        setParam('')
        setRedirect(false)
        const searchFilters = filterResults()
        setFilters(searchFilters)
        window.localStorage.setItem('patrimonialFilters')
    }

    const setPosition = () => {
        if (coord !== 0) {
            window.localStorage.setItem(
                'storedPosition2', JSON.stringify(coord)
            )
        }
    }

    window.localStorage.getItem('totalAds')
    /*const pagesVisited = pageNumber * perPage;
    const totalAds = window.localStorage.getItem('patrimonialTotalAds')*/
    const pageCount = Math.ceil(parseInt(window.localStorage.getItem('totalAds')) / perPage);
    const getPostItems = orderedItems
    .map(item => {
            return item.department === "Patrimonio" && item.showOnWeb === true? 
            <div onClick={setPosition} className='patrimonial__list__item' key={item._id}>
                {item.gvOperationClose === 'Alquilado' || item.gvOperationClose === 'Vendido' ? 
                    <div className='wrapper'>
                        <div className='patrimonial__list__item__status'>
                            <p>{item.gvOperationClose}</p>
                        </div>
                        <Carousel 
                            className='patrimonial__list__item__images'
                            showArrows={true}
                            showThumbs={false}
                            infiniteLoop={true}
                            showStatus={false}
                        >
                            <img src={item.images.main} alt={item.title} loading="lazy"/>
                            {/*{item.images.others.map((image)=> (
                                <img key={item.title} src={image} alt={item.title}/>
                            ))}*/}
                        </Carousel>
                        <div>
                            <div className='patrimonial__list__item__text'>
                                {item.adType.length === 1 ? 
                                    <h2 className='patrimonial__list__item__text__price'>{item.adType.map(type => 
                                        type==='Venta' && item.sale.saleShowOnWeb===true && item.sale.saleValue !== 0 ? 
                                        `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                        type==='Alquiler' && item.rent.rentShowOnWeb===true && item.rent.rentValue !== 0 ?
                                        `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                    </h2>
                                    :
                                    <h2 className='patrimonial__list__item__text__prices'>
                                        {item.sale.saleShowOnWeb && item.sale.saleValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                        {item.rent.rentShowOnWeb && item.rent.rentValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
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
                                        <li><span><img src={refer} alt='referencia'/></span><p> Ref {item.adReference}</p></li>
                                    :null}
                                </ul>
                                <div className='patrimonial__list__item__text__blocker'></div>
                            </div>
                        </div>
                    </div> 
                    :
                    <div>
                        {isLoading ?
                        <Carousel 
                            className='patrimonial__list__item__images'
                            showArrows={true}
                            showThumbs={false}
                            infiniteLoop={true}
                            showStatus={false}
                        >
                            <img src={item.images.main} alt={item.title} loading="lazy"/>
                            {/*{item.images.others.map((image)=> (
                                <img key={item.title} src={image} alt={item.title}/>
                            ))}*/}
                        </Carousel>
                        :<div className='spinnerBar'>  
                            <BarLoader color="#000000" width='80px' height='2px' className='barloader'/>
                        </div>
                        }
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
                    </div>
                }
            </div> : null
    })

    useEffect(() => {
        if (state.length>=1) {
            let reducedState = []
            state.map(item => 
                item.department === 'Patrimonio' && item.showOnWeb === true ? reducedState.push(item) : null
            )
            window.localStorage.setItem(
                'storedState', JSON.stringify(reducedState)
            )
        }
    },[state])

    useEffect (() => {
        const localState = window.localStorage.getItem('storedState')
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        let patrimonialItems = []
        if (localState) {
            const itemList = JSON.parse(localState)
            const SOR = JSON.parse(storedSOR)
            itemList.map(item => 
                patrimonialItems.push(item)
            )
            const array = Object.values(patrimonialItems)
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
            patrimonialItems=orderedArrayPrice
        }
        setOrderedItems(patrimonialItems)
    },[state])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4])-1)
        for(let i = 0; i<pageCount; i++){
            elements.push(
                <li key={i} className={i+1 === parseInt(splitedLocation[4]) ? 'patrimonial__pagination__list__item currentPage' : 'patrimonial__pagination__list__item'}><a href={`${window.location.origin}/patrimonial/${i+1}`}>{i+1}</a></li>
            )
        }
        setPagElements(elements)
    },[pageCount])

    useEffect(() => {
        const activeFilters = JSON.parse(window.localStorage.getItem('patrimonialFilters'))
        let splitedLocation = window.location.href.split('/');
        activeFilters.page = parseInt(splitedLocation[4])

        getPatrimonial(activeFilters).then(items=>{
            setState(items.ads)
            window.localStorage.setItem('storedState', JSON.stringify(items.ads))
            window.localStorage.setItem('totalAds', items.totalAds)
            setIsLoading(true)
            setIsFound(true)
        })
    },[filters, setState])

    useEffect(()=> {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || ref!==''){
            setDisableButton(true)
        }else{
            setDisableButton(false)
        }
    },[ref, selectedActive, saleOrRentActive, typeHouseActive])

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
    },[filter, saleOrRent, disableSliders])


    useEffect(() => {
        setTimeout(function(){
            const localPosition = window.localStorage.getItem('storedPosition2')
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
                    state2.map(item => {
                        if (item.showOnWeb === true && item.department === 'Patrimonio') {
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
                    state2.map(item => {
                        if(item.showOnWeb === true && item.department === 'Patrimonio'){
                            item.adType.map(itemType => {
                                if (itemType === 'Alquiler'){
                                    priceArray.push(item.rent.rentValue);
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
                return(item)
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

    const filterResults = () => {
        let activeFilters = {}
        let splitedLocation = window.location.href.split('/');
        activeFilters.page = parseInt(splitedLocation[4])

        if (saleOrRent.length) {
            activeFilters = { ...activeFilters, adType: saleOrRent }
        }

        if (saleOrRent.length) {
            activeFilters = { ...activeFilters, adType: saleOrRent }
        }

        if (typeHouse.length) {
            activeFilters = { ...activeFilters, adBuildingType: typeHouse }
        }

        if (selected.length > 0) {
            const selectedIds = getZoneId(selected)
            activeFilters = { ...activeFilters, zone: selectedIds }
            console.log(selectedIds)
        }

        window.localStorage.setItem('patrimonialFilters', JSON.stringify(activeFilters))
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

    const toggleFilter = () => {
        setFilter (!filter)
    }

    const toggleOrderItems = () => {
        setOrderItems (!orderItems)
    }

    const deletePosition = () => {
        window.localStorage.removeItem('storedPosition2')
    }

    window.onmousemove = function (e){
        var y = e.pageY
        setCoord(y)
    }

    /*const seeAll = () => {
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
        let orderedArrayPrice = array.sort(sortArray);
        setOrderedItems(orderedArrayPrice)
        setFilter (!filter)
        window.scroll(
            {top:0}
        )
    }*/

    return (
        <div className='patrimonial'>
            <Header/>
            {orderedItems.length > 0 ?
                <div>
                    {filter === true ? 
                        <div className='patrimonial__filter'>
                            <div className='patrimonial__filter__position'>
                                <h2 className='patrimonial__filter__title'>Zonas <span onClick={toggleFilter}><img src={cerrarFiltro} alt='cerrar'/></span></h2>
                                <h3 className='patrimonial__filter__subTitle'>Seleccione una o varias zonas</h3>
                                <div className='patrimonial__filter__position__mapContainer'>
                                    <div className='patrimonial__filter__position__mapContainer__mapa'>
                                        <input type='image' className='c1' src={carretera1} alt='componente mapa' />
                                        <input type='image' className='c2' src={carretera2} alt='componente mapa' />
                                        <input type='image' className='c3' src={carretera3} alt='componente mapa' />
                                        <input type='image' className='c4' src={carretera4} alt='componente mapa' />
                                        <input type='image' className='c5' src={carretera5} alt='componente mapa' />
                                        <input type='image' className='c6' src={carretera6} alt='componente mapa' />
                                        <input type='image' className='c62' src={carretera62} alt='componente mapa' />
                                        <input type='image' className='c7' src={carretera7} alt='componente mapa' />
                                        <input type='image' className='c8' src={carretera8} alt='componente mapa' />
                                        <input type='image' className='c9' src={carretera9} alt='componente mapa' />
                                        <input type='image' className='c10' src={carretera10} alt='componente mapa' />
                                        <input type='image' className='secu' src={secu} alt='componente mapa' />
                                        <input type='image' className='ceba' src={ceba} alt='componente mapa' />
                                        <button name='El Plantío' onClick={toggleActive} id='plan' className='plan'>
                                            <input type='image' src={plan1} alt='componente mapa' className='plan__1'/>
                                            <input type='image' src={plan2} alt='componente mapa' className='plan__2'/>
                                            <p>El plantío</p>
                                        </button>
                                        <button type='image' onClick={toggleActive} name='Valdemarín' id='vald' className='vald'>
                                            <input type='image' src={vald} alt='componente mapa' />
                                            <p>Valdemarín</p>
                                        </button>
                                        <button onClick={toggleActive} name='Pozuelo' id='pozu' className='pozu'>
                                            <input type='image' src={pozu} alt='componente mapa' />
                                            <p>Pozuelo</p>
                                        </button>
                                        <button onClick={toggleActive} name='P.E. La Finca' id='pe' className='pe'>
                                            <input type='image'src={pe} alt='componente mapa' />
                                            <p>P.E. <br/> La Finca</p>
                                        </button>
                                        <button onClick={toggleActive} name='CTBA' id='ctba' className='ctba'>
                                            <input type='image' src={ctba1} alt='componente mapa' className='ctba__1'/>
                                            <input type='image' src={ctba2} alt='componente mapa' className='ctba__2'/>
                                            <p>CTBA</p>
                                        </button>
                                        <button onClick={toggleActive} name='Cuzco' id='cuzco' className='cuzco'>
                                            <input type='image' src={cuzco1} alt='componente mapa' className='cuzco__2'/>
                                            <input type='image' src={cuzco2} alt='componente mapa' />
                                            <p>Cuzco</p>
                                        </button>
                                        <button onClick={toggleActive} name='Azca' id='azca' className='azca'>
                                            <input type='image' src={azca} alt='componente mapa' />
                                            <p>Azca</p>
                                        </button>
                                        <button onClick={toggleActive} name='Chamberí' id='cham' className='cham'>
                                            <input type='image' src={cham} alt='componente mapa' />
                                            <p>Chamberí</p>
                                        </button>
                                        <button onClick={toggleActive} name='Almagro' id='alma' className='alma'>
                                            <input type='image' src={alma} alt='componente mapa' />
                                            <p>Almagro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Centro' id='cent' className='cent'>
                                            <input type='image' src={cent} alt='componente mapa'/>
                                            <p>Centro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Méndez Álvaro' id='meal' className='meal'>
                                            <input type='image' src={meal} alt='componente mapa' />
                                            <p>Méndez Álvaro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Julián Camarillo' id='juca' className='juca' >
                                            <input type='image' src={juca} alt='componente mapa' />
                                            <p>Julián Camarillo</p>
                                        </button>
                                        <button onClick={toggleActive} name='Av. América' id='amer' className='amer'>
                                            <input type='image' src={amer} alt='componente mapa' />
                                            <input type='image' src={amer2} alt='componente mapa' className='amer__2'/>
                                            <p>Av. América</p>
                                        </button>
                                        <button onClick={toggleActive} name='Josefa Valcárcel' id='jova' className='jova'>
                                            <input type='image' src={jova} alt='componente mapa' />
                                            <p>Josefa Valcárcel</p>
                                        </button>
                                        <button onClick={toggleActive} name='Chamartín' id='chama' className='chama'>
                                            <input type='image' src={chama} alt='componente mapa' />
                                            <p>Chamartín</p>
                                        </button>
                                        <button onClick={toggleActive} name='Arturo Soria' id='arso' className='arso'>
                                            <input type='image' src={arso} alt='componente mapa' />
                                            <p>Arturo <br/> Soria</p>
                                        </button>
                                        <button onClick={toggleActive} name='Campos de las Naciones' id='cana' className='cana'>
                                            <input type='image' src={cana} alt='componente mapa' />
                                            <p>Campo de las <br/> Naciones</p>
                                        </button>
                                        <button onClick={toggleActive} name='Las Tablas - San Chinarro' id='sanchi' className='sanchi'>
                                            <input type='image' src={sanchi} alt='componente mapa' className='sanchi__1'/>
                                            <input type='image' src={sanchi2} alt='componente mapa' className='sanchi__2'/>
                                            <input type='image' src={sanchi3} alt='componente mapa' className='sanchi__3'/>
                                            <p>Las Tablas<br/> San Chinarro</p>
                                        </button>
                                        <button onClick={toggleActive} name='Arroyo de la Vega' id='arva' className='arva'>
                                            <input type='image' src={arva} alt='componente mapa'className='arva__2'/>
                                            <input type='image' src={arva2} alt='componente mapa' />
                                            <p>Arroyo de <br/>la Vega</p>
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
                                    </div>
                                </div>
                                <div className='patrimonial__filter__selectors'>
                                    <div className='patrimonial__filter__selectors__estado'>
                                        <h3>Estado</h3>
                                        <div className='patrimonial__filter__selectors__estado__buttons'>
                                            <button onClick={selectSaleOrRent} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                                            <button onClick={selectSaleOrRent} name='Venta' id='vent' className='vent'>Venta</button>
                                        </div>
                                    </div>
                                    <div className='patrimonial__filter__selectors__tipo'>
                                        <h3>Tipo</h3>
                                        <div className='patrimonial__filter__selectors__tipo__buttons'>
                                            <button onClick={addType} name='Oficina' id='oficina' className='oficina'>Oficina</button>
                                            <button onClick={addType} name='Edificio' id='edificio' className='edificio'>Edificio</button>
                                            <button onClick={addType} name='Local' id='retail' className='retail'>Local</button>
                                        </div>
                                    </div>
                                    <div className='patrimonial__filter__selectors__sliders'>
                                        <p className={disableSliders === true ? 'patrimonial__filter__selectors__sliders__price' : 'patrimonial__filter__selectors__sliders__priceDisabled'}>Precio €</p>
                                        <Slider
                                            className={disableSliders === true ? 'patrimonial__filter__selectors__sliders__price' : 'patrimonial__filter__selectors__sliders__priceDisabled'}
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
                                        <p className={disableSliders === true ? 'patrimonial__filter__selectors__sliders__surface' : 'patrimonial__filter__selectors__sliders__surfaceDisabled'}>Superficie m<sup>2</sup></p>
                                        <Slider
                                            className={disableSliders === true ? 'patrimonial__filter__selectors__sliders__surface' : 'patrimonial__filter__selectors__sliders__surfaceDisabled'}
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
                                    <div className='patrimonial__filter__selectors__buscar'>
                                        {disableButton=== false ?
                                            <NavLink onClick={getTypeHouse} className='patrimonial__filter__selectors__buscar__all' to={generatePath(routes.Patrimonial, {page:1})}>Ver todos</NavLink>
                                            :
                                            <button className='patrimonial__filter__selectors__buscar__allDisabled'>Ver todos</button>
                                        }
                                        {disableButton===true ?
                                            <NavLink className='patrimonial__filter__selectors__buscar__search' 
                                                onClick={getTypeHouse} 
                                                to={redirect && (<Navigate to={`/Patrimonial=${param}`}/>)}>Buscar
                                            </NavLink>
                                            :
                                            <button className='patrimonial__filter__selectors__buscar__searchDisabled' >Buscar</button>
                                        }                                 
                                    </div>
                                    <div className='patrimonial__filter__selectors__ref'>
                                        <h4>Búsqueda por referencia</h4>
                                        <input onChangeCapture={addRef} type='text'/>
                                        <img className={verLupa === true ? 'patrimonial__filter__selectors__ref__lupa' : 'patrimonial__filter__selectors__ref__lupaOculta'} src={lupa} alt='lupa'/>
                                        {itemRef!==ref && ref!=='' ?<p className='patrimonial__filter__selectors__ref__existe'>La referencia no existe</p> : null }
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    }
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
                    <div onClick={deletePosition} className='patrimonial__pagination'>
                        <ul className='patrimonial__pagination__list'>
                            <li className='patrimonial__pagination__list__item'><a className='patrimonial__pagination__list__item__back' href={`${window.location.origin}/patrimonial/${pageNumber}`}> <img src={mayor} alt='simbolo mayor' /> </a></li>
                            {pagElements}
                            <li className='patrimonial__pagination__list__item'><a className='patrimonial__pagination__list__item__next' href={`${window.location.origin}/patrimonial/${pageNumber+2}`}> <img src={mayor} alt='simbolo menor' /> </a></li>
                        </ul>
                    </div>
                    <div className='patrimonial__zoneMap'>
                        <NavLink to={routes.FilterPatrimonial} className='patrimonial__zoneMap__button'><span><img src={zoneMap} alt='boton mapa'/></span> Abrir el mapa de zonas</NavLink>
                    </div>
                    <ContactIndex/>
                </div>
            :
            <div className='residential__empty'>
                {
                    isFound ?
                    (
                        <div className='residential__empty'>
                            <h2 className='residential__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                            <Link className='residential__empty__button' to={routes.FilterResidential}>Volver al mapa</Link>            
                        </div>
                    )
                    :
                <BarLoader color="#000000" width='150px' height='2px'/>

                }
            
            </div>
            }
        </div>
    )
}

export default Patrimonio
