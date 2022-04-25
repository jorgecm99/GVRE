import React, {useState, useContext, useEffect} from 'react';
import './filtroPatrimonio.scss'
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
import avion from '../../../assets/maps/avion.svg';
import boca from '../../../assets/maps/boca.svg';
import lupa from '../../../assets/SVG/mobile/comun/filtros_lupa.svg'
import Header from '../../common/Header/Header';
import { generalContext } from '../../../providers/generalProvider';
import { NavLink, generatePath } from 'react-router-dom';
import routes from '../../../config/routes';
import { Slider } from '@mui/material';
import { getResidential } from '../../../api-requests/requests';

const FiltroPatrimonio = () => {

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
    const [disableButton, setDisableButton] = useState(false);
    const [disableSliders, setDisableSliders] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [state, setState] = useContext(generalContext);

    useEffect(() => {
        window.scroll(
            {top:0}
        )
        window.localStorage.removeItem('storedState')
        window.localStorage.removeItem('storedPosition2')
    },[])

    useEffect(() => {
        getResidential().then(items=> {
            setState(items)
        })
    },[setState])

    useEffect(()=> {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || ref!==''){
            setDisableButton(true)
        }else{
            setDisableButton(false)
        }
    },[ref, selectedActive, saleOrRentActive, typeHouseActive])

    useEffect(() => {
        if (state.length > 0) {
            state.map(itemState => {
                if (ref === itemState.adReference) {
                    setItemRef(itemState.adReference)
                }
                return(itemState)
            })
        }
        if (ref!== '') {
            setVerLupa(false)
        }else{
            setVerLupa(true)
        }    
    },[ref, state])

    useEffect(() => {
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

    },[price, surface, saleOrRent])

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
        if (saleOrRent.length===1) {
            saleOrRent.map(item => {
                if (item === 'Venta' ) {
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    state.map(item => {
                        if (item.showOnWeb === true && item.department === 'Patrimonio') {
                            priceArray.push(item.sale.saleValue);
                            surfaceArray.push(item.buildSurface);
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
                }else if (item ==='Alquiler'){
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    state.map(item => {
                        if(item.showOnWeb === true && item.department === 'Patrimonio'){
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
                return(item)
            })
        }
        if (saleOrRent.length !== 0) {
            setSaleOrRentActive(true)
        }else{
            setSaleOrRentActive(false)
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
            state.map(itemState => 
                saleOrRent.map(itemSale => 
                    itemState.adType.map(itemAd => 
                        itemSale===itemAd? actualizeState.push(itemState) : null
                    )
                )
            )
        }
        let actualizeState2 = []
        if (typeHouse.length>0) {
            state.map(itemState => 
                typeHouse.map(itemType => 
                    itemState.adBuildingType.map(itemAd => 
                        itemType === itemAd ? actualizeState2.push(itemState): null
                    )
                )
            )
        }
        let actualizeState3 = []
        if (selected.length>0){
            state.map(itemState => 
                selected.map(itemType => 
                    itemState.zone.map(itemAd =>
                        itemType === itemAd.name ? actualizeState3.push(itemState): null
                    )
                )
            )
        }

        let finalState = [];
        ///////////////////3////////////////////////////////
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length>0){
            let AB = []
            actualizeState.map(itemA => 
                actualizeState2.map(itemB => itemA._id === itemB._id ? AB.push(itemA) : null))
            AB.map(itemAB => 
                actualizeState3.map(itemC => itemAB._id === itemC._id ? finalState.push(itemC) : null))
        }
        ////////////////////2////////////////////////////////
        if (actualizeState.length>0 && actualizeState2.length>0 && actualizeState3.length===0){
            actualizeState.map(itemA => 
                actualizeState2.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length>0){
            actualizeState.map(itemA => 
                actualizeState3.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length>0){
            actualizeState2.map(itemA => 
                actualizeState3.map (itemB => itemA._id === itemB._id ? finalState.push(itemA) : null))
        }
        ///////////////////1////////////////////////////////////
        if (actualizeState.length>0 && actualizeState2.length===0 && actualizeState3.length===0){
            finalState = actualizeState
        }
        if (actualizeState.length===0 && actualizeState2.length>0 && actualizeState3.length===0){
            finalState = actualizeState2
        }
        if (actualizeState.length===0 && actualizeState2.length===0 && actualizeState3.length>0){
            finalState = actualizeState3
        }
        ///////////////////////control///////////////////////////

        if (selected.length>0 && actualizeState3.length === 0){
            finalState=[]
        }

        if (finalState.length>0) {
            let slidersFilter = []
            finalState.map(item => {
                item.adType.map(type => {
                    if (type === 'Venta' ){
                        saleOrRent.map(itemSR => {
                            if (itemSR === 'Venta'){
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
            setState(filtered)   
            
        }
        if (finalState.length===0) {
            setState([])
        }
        if (ref !== ''){
            let references = []
            state.map(item => 
                item.adReference===ref ? references.push(item) : null
            )
            setState(references)
        }
        if (saleOrRent.length === 1){
            saleOrRent.map(item => {
                window.localStorage.setItem(
                    'saleOrRentStored', JSON.stringify(item)
                )    
                return(item)        
            })
        }
    }

    return (
        <div className='filtroPatrimonio'>
            <Header/>
            <h2 className='filtroPatrimonio__title'>Mapa</h2>
            <h3 className='filtroPatrimonio__subTitle'>Seleccione una o varias zonas</h3>
            <div className='filtroPatrimonio__filterPosition'>
                <div className='filtroPatrimonio__filterPosition__mapContainer'>
                    <div className='filtroPatrimonio__filterPosition__mapContainer__mapa'>
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
                        <input type='image' className='avion' src={avion} alt='componente mapa' />
                        <input type='image' className='boca' src={boca} alt='componente mapa' />
                        <div className='a1'>A1</div>
                        <div className='a2'>A2</div>
                        <div className='a3'>A3</div>
                        <div className='a5'>A5</div>
                        <div className='a6'>A6</div>
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
                        <button onClick={toggleActive} name='CTBA (Cuatro torres business area)' id='ctba' className='ctba'>
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
                        <button onClick={toggleActive} name='Salamanca' id='sala' className='sala'>
                            <input type='image' src={sala} alt='componente mapa' />
                            <p>Salamanca</p>
                        </button>
                        <button onClick={toggleActive} name='Jerónimos' id='jero' className='jero'>
                            <input type='image' src={jero} alt='componente mapa' />
                            <p>Jerónimos</p>
                        </button>
                    </div>
                </div>
                <div className='filtroPatrimonio__filterPosition__selectors'>
                    <div className='filtroPatrimonio__filterPosition__selectors__estado'>
                        <h3>Estado</h3>
                        <div className='filtroPatrimonio__filterPosition__selectors__estado__buttons'>
                            <button onClick={selectSaleOrRent} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                            <button onClick={selectSaleOrRent} name='Venta' id='vent' className='vent'>Venta</button>
                        </div>
                    </div>
                    <div className='filtroPatrimonio__filterPosition__selectors__tipo'>
                        <h3>Tipo</h3>
                        <div className='filtroPatrimonio__filterPosition__selectors__tipo__buttons'>
                            <button onClick={addType} name='Oficina' id='oficina' className='oficina'>Oficina</button>
                            <button onClick={addType} name='Edificio' id='edificio' className='edificio'>Edificio</button>
                            <button onClick={addType} name='Local' id='retail' className='retail'>Local</button>
                        </div>
                    </div>
                    <div className='filtroPatrimonio__filterPosition__selectors__sliders'>
                                <p className={disableSliders === true ? 'filtroPatrimonio__filterPosition__selectors__sliders__price' : 'filtroPatrimonio__filterPosition__selectors__sliders__priceDisabled'}>Precio €</p>
                                <Slider
                                    className={disableSliders === true ? 'filtroPatrimonio__filterPosition__selectors__sliders__price' : 'filtroPatrimonio__filterPosition__selectors__sliders__priceDisabled'}
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
                                <p className={disableSliders === true ? 'filtroPatrimonio__filterPosition__selectors__sliders__surface' : 'filtroPatrimonio__filterPosition__selectors__sliders__surfaceDisabled'}>Superficie m<sup>2</sup></p>
                                <Slider
                                    className={disableSliders === true ? 'filtroPatrimonio__filterPosition__selectors__sliders__surface' : 'filtroPatrimonio__filterPosition__selectors__sliders__surfaceDisabled'}
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
                            <div className='filtroPatrimonio__filterPosition__selectors__buscar'>
                                {disableButton=== false ?
                                    <NavLink className='filtroPatrimonio__filterPosition__selectors__buscar__all' to={generatePath(routes.Patrimonial, {page:1})}>Ver todos</NavLink>
                                    :
                                    <button className='filtroPatrimonio__filterPosition__selectors__buscar__allDisabled'>Ver todos</button>
                                }
                                {disableButton===true ?
                                    <NavLink className='filtroPatrimonio__filterPosition__selectors__buscar__search' 
                                        onClick={compareStates} 
                                        to={generatePath(routes.Patrimonial, {page:1})}>Buscar
                                    </NavLink>
                                    :
                                    <button className='filtroPatrimonio__filterPosition__selectors__buscar__searchDisabled' >Buscar</button>
                                }
                            </div>
                    <div className='filtroPatrimonio__filterPosition__selectors__ref'>
                        <h4>Búsqueda por referencia</h4>
                        <input onChange={addRef} type='text'/>
                        <img className={verLupa === true ? 'filtroPatrimonio__filterPosition__selectors__ref__lupa' : 'filtroPatrimonio__filterPosition__selectors__ref__lupaOculta'} src={lupa} alt='lupa'/>
                        {itemRef!==ref && ref!=='' ?<p className='filtroPatrimonio__filterPosition__selectors__ref__existe'>La referencia no existe</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FiltroPatrimonio