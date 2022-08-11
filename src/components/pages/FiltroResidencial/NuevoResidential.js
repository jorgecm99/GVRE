import React, { useState, useContext, useEffect } from 'react';
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
import { NavLink, generatePath } from 'react-router-dom';
import routes from '../../../config/routes';
import './filtroResidencial.scss'
import { getZoneId } from '../../common/MapZones/MapZones';

const FiltroResidencial = () => {

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    const [itemRef, setItemRef] = useState('initial');
    const [ref, setRef] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [state, setState] = useContext(generalContext);
    const [itemPage] = useState([]);
    /*const [filter, setFilter] = useState({});*/

    const toggleActive = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} active`
            selected.push(e.currentTarget.name)
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSelected = selected.filter(item => item !== elementName)
            selected.splice(0, selected.length, ...newSelected)
        }
        if (selected.length !== 0) {
            setSelectedActive(true)
        } else {
            setSelectedActive(false)
        }
    }
    const selectSaleOrRent = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            saleOrRent.push(e.currentTarget.name)
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSaleOrRent = saleOrRent.filter(item => item !== elementName)
            saleOrRent.splice(0, saleOrRent.length, ...newSaleOrRent)
        }
        if (saleOrRent.length !== 0) {
            setSaleOrRentActive(true)
        } else {
            setSaleOrRentActive(false)
        }
    }

    const addType = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            typeHouse.push(e.currentTarget.name)
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newType = typeHouse.filter(item => item !== elementName)
            typeHouse.splice(0, typeHouse.length, ...newType)
        }
        if (typeHouse.length !== 0) {
            setTypeHouseActive(true)
        } else {
            setTypeHouseActive(false)
        }
    }

    const addExtra = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            extras.push(e.currentTarget.name)
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newExtra = extras.filter(item => item !== elementName)
            extras.splice(0, extras.length, ...newExtra)
        }
        if (extras.length !== 0) {
            setExtrasActive(true)
        } else {
            setExtrasActive(false)
        }
    }

    const addRef = (e) => {
        setRef(e.currentTarget.value)
    }


    const filterResults = () => {
        let activeFilters = {}

        if (selected.length > 0) {
            const selectedIds = getZoneId(selected)
            activeFilters = { ...activeFilters, zone: selectedIds }
            console.log(selectedIds)
        }

        if (itemPage.length) {
            activeFilters = { ...activeFilters, showOnWeb: itemPage[0] }
            console.log(itemPage)
        }

        if (saleOrRent.length) {
            activeFilters = { ...activeFilters, adType: saleOrRent }
            console.log(saleOrRent)
        }

        if (typeHouse.length) {
            activeFilters = { ...activeFilters, adBuildingType: typeHouse }
        }

        if (extras.length) {
            if (extras.includes('garage')) {
                activeFilters = { ...activeFilters, garage: true }
            }

            if (extras.includes('swimmingPool')) {
                activeFilters = { ...activeFilters, swimmingPool: true }
            }

            if (extras.includes('terrace')) {
                activeFilters = { ...activeFilters, terrace: true }
            }
        }
        window.localStorage.setItem('residentialFilters', JSON.stringify(activeFilters))
    }

    useEffect(() => {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || extrasActive === true || ref !== '') {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [ref, selectedActive, saleOrRentActive, typeHouseActive, extrasActive])



    return (
        <div className='filtroResidencial'>
            <Header />
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
                            <p>Monte <br /> Claro</p>
                            <input type='image' src={mocl} alt='componente mapa' />
                            <div></div>
                        </button>
                        <button type='image' onClick={toggleActive} name='Montealina' id='moal' className='moal'>
                            <input type='image' src={moal} alt='componente mapa' />
                            <p>Monte<br />Alina</p>
                        </button>
                        <button onClick={toggleActive} name='Prado Largo' id='prla' className='prla'>
                            <input type='image' src={prla} alt='componente mapa' />
                            <p>Prado<br />Largo</p>
                        </button>
                        <button onClick={toggleActive} name='Las Encinas' id='enci' className='enci'>
                            <input type='image' src={enci} alt='componente mapa' />
                            <p>Las Encinas</p>
                        </button>
                        <button onClick={toggleActive} name='Alamo de Bulanas' id='alam' className='alam'>
                            <input type='image' src={alam} alt='componente mapa' />
                            <p>Alamos de<br />Bularas</p>
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
                            <input type='image' src={vald1} alt='componente mapa' />
                            <input type='image' className='vald2' src={vald2} alt='componente mapa' />
                            <p>Valdemarín</p>
                        </button>
                        <button onClick={toggleActive} name='Colonia Fuentelarreyna' id='fuen1' className='fuen1'>
                            <input type='image' src={fuen1} alt='componente mapa' />
                            <input type='image' className='fuen2' src={fuen2} alt='componente mapa' />
                            <p>Fuentelarreyna</p>
                        </button>
                        <button onClick={toggleActive} name='Puerta de Hierro' id='puer' className='puer' >
                            <input type='image' src={puer} alt='componente mapa' />
                            <p>Puerta de <br />Hierro</p>
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
                            <p>Hispano <br /> América</p>
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
                            <p>Conde<br />Orgaz</p>
                        </button>
                    </div>
                </div>
                <div className='selectors'>
                    <div className='selectors__estado'>
                        <h3>Estado</h3>
                        <div className='selectors__estado__buttons'>
                            <button onClick={(e) => {
                                selectSaleOrRent(e)
                            }} name='Venta' id='vent' className='vent'>Venta</button>
                            <button onClick={(e) => {
                                selectSaleOrRent(e)
                            }} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                        </div>
                    </div>
                    <div className='selectors__tipo'>
                        <h3>Tipo</h3>
                        <div className='selectors__tipo__buttons'>
                            <button onClick={(e) => addType(e)} name='Casa' id='casa' className='casa'>Casa</button>
                            <button onClick={(e) => addType(e)} name='Piso' id='piso' className='piso'>Piso</button>
                            <button onClick={(e) => addType(e)} name='Parcela' id='parcela' className='parcela'>Parcela</button>
                        </div>
                    </div>
                    <div className='selectors__extras'>
                        <h3>Extras</h3>
                        <div className='selectors__extras__buttons'>
                            <button onClick={(e) => addExtra(e)} name='swimmingPool' id='piscina' className='piscina'>Piscina</button>
                            <button onClick={(e) => addExtra(e)} name='garage' id='garaje' className='garaje'>Garaje</button>
                            <button onClick={(e) => addExtra(e)} name='terrace' id='terraza' className='terraza'>Terraza</button>
                        </div>
                    </div>
                    <div className='selectors__buscar'>
                        {disableButton === false ?
                            <NavLink onClick={filterResults} className='selectors__buscar__all' to={generatePath(routes.Residential, { page: 1 })}>Ver todos</NavLink>
                            :
                            <button className='selectors__buscar__allDisabled'>Ver todos</button>
                        }
                        {disableButton === true ?
                            // <button className='selectors__buscar__search' onClick={filterResults}>Buscar
                            // </button>
                            /**  Comentado para probar a hacer la llamada sin que vaya a la vista de Residential
                            */
                            <NavLink className='selectors__buscar__search'
                                onClick={filterResults}
                                to={generatePath(routes.Residential, { page: 1 })}>Buscar
                            </NavLink>
                            :
                            <button className='selectors__buscar__searchDisabled' >Buscar</button>
                        }
                    </div>
                    <div className='selectors__ref'>
                        <h4>Búsqueda por referencia</h4>
                        <input onChangeCapture={addRef} type='text' />
                        <img className={verLupa === true ? 'selectors__ref__lupa' : 'selectors__ref__lupaOculta'} src={lupa} alt='lupa' />
                        {itemRef !== ref && ref !== '' ? <p className='selectors__ref__existe'>La referencia no existe</p> : null}
                    </div>
                </div>
            </div>
        </div >
    )
}


export default FiltroResidencial