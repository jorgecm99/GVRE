import React, {useState, useContext, useEffect} from 'react';
import './filtroResidencial.scss'
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
import avion from '../../../assets/maps/avion.svg';
import boca from '../../../assets/maps/boca.svg';
import lupa from '../../../assets/SVG/mobile/comun/filtros_lupa.svg'
import Header from '../../common/Header/Header';
import { generalContext } from '../../../providers/generalProvider';
import { NavLink, generatePath} from 'react-router-dom';
import routes from '../../../config/routes';
import { getResidential } from '../../../api-requests/requests';

const FiltroResidencial = () => {

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    const [itemRef, setItemRef] = useState ('initial');
    const [ref, setRef] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [state, setState] = useContext(generalContext);

    useEffect(() => {
        window.scroll(
            {top:0}
        )
        window.localStorage.removeItem('storedState')
        window.localStorage.removeItem('storedPosition2')
        window.localStorage.removeItem('saleOrRentStored')
    },[])

    useEffect(() => {
        getResidential().then(items=> {
            setState(items)
        })
    },[setState])

    useEffect(()=> {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || extrasActive === true || ref!==''){
            setDisableButton(true)
        }else{
            setDisableButton(false)
        }
    },[ref, selectedActive, saleOrRentActive, typeHouseActive, extrasActive])

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
                        return (itemAd)
                    })
                )
            )
        }
        let actualizeState4 = []
        if (extras.length>0){
            let pool = [];
            let park = [];
            let terr = [];
            state.map(itemState => 
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
        <div className='filtroResidencial'>
            <Header/>
            <h2 className='filtroResidencial__title'>Mapa</h2>
            <h3 className='filtroResidencial__subTitle'>Seleccione una o varias zonas</h3>
            <div className='filterPosition'>
                <div className='filterPosition__mapContainer'>
                    <div className='mapa'>
                        <input type='image' className='c1' src={carretera1} alt='componente mapa' />
                        <input type='image' className='c2' src={carretera2} alt='componente mapa' />
                        <input type='image' className='c3' src={carretera3} alt='componente mapa' />
                        <input type='image' className='c4' src={carretera4} alt='componente mapa' />
                        <input type='image' className='c5' src={carretera5} alt='componente mapa' />
                        <input type='image' className='c6' src={carretera6} alt='componente mapa' />
                        <input type='image' className='c62' src={carretera62} alt='componente mapa' />
                        <input type='image' className='c7' src={carretera7} alt='componente mapa' />
                        <input type='image' className='c8' src={carretera8} alt='componente mapa' />
                        <input type='image' className='avion' src={avion} alt='componente mapa' />
                        <input type='image' className='boca' src={boca} alt='componente mapa' />
                        <div className='a1'>A1</div>
                        <div className='a2'>A2</div>
                        <div className='a3'>A3</div>
                        <div className='a5'>A5</div>
                        <div className='a6'>A6</div>
                        <button name='Monteclaro' onClick={toggleActive} id='mocl' className='mocl'>
                            <p>Monte <br/> Claro</p>
                            <input type='image' src={mocl} alt='componente mapa' />
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
                            <p>Fuentelarreyna</p>
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
                <div className='selectors'>
                    <div className='selectors__estado'>
                        <h3>Estado</h3>
                        <div className='selectors__estado__buttons'>
                            <button onClick={selectSaleOrRent} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                            <button onClick={selectSaleOrRent} name='Venta' id='vent' className='vent'>Venta</button>
                        </div>
                    </div>
                    <div className='selectors__tipo'>
                        <h3>Tipo</h3>
                        <div className='selectors__tipo__buttons'>
                            <button onClick={addType} name='Casa' id='casa' className='casa'>Casa</button>
                            <button onClick={addType} name='Piso' id='piso' className='piso'>Piso</button>
                            <button onClick={addType} name='Parcela' id='parcela' className='parcela'>Parcela</button>
                        </div>
                    </div>
                    <div className='selectors__extras'>
                        <h3>Extras</h3>
                        <div className='selectors__extras__buttons'>
                            <button onClick={addExtra} name='swimmingPool' id='piscina' className='piscina'>Piscina</button>
                            <button onClick={addExtra} name='garage' id='garaje' className='garaje'>Garaje</button>
                            <button onClick={addExtra} name='terrace' id='terraza' className='terraza'>Terraza</button>
                        </div>
                    </div>
                    <div className='selectors__buscar'>
                    {disableButton=== false ?
                            <NavLink className='selectors__buscar__all' to={generatePath(routes.Residential, {page:1})}>Ver todos</NavLink>
                            :
                            <button className='selectors__buscar__allDisabled'>Ver todos</button>
                        }
                        {disableButton===true ?
                            <NavLink className='selectors__buscar__search' 
                                onClick={compareStates} 
                                to={generatePath(routes.Residential, {page:1})}>Buscar
                            </NavLink>
                            :
                            <button className='selectors__buscar__searchDisabled' >Buscar</button>
                        }
                    </div>
                    <div className='selectors__ref'>
                        <h4>Búsqueda por referencia</h4>
                        <input onChangeCapture={addRef} type='text'/>
                        <img className={verLupa === true ? 'selectors__ref__lupa' : 'selectors__ref__lupaOculta'} src={lupa} alt='lupa'/>
                        {itemRef!==ref && ref!=='' ?<p className='selectors__ref__existe'>La referencia no existe</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FiltroResidencial