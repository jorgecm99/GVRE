import React, {useContext, useState, useEffect} from 'react';
import { generalContext } from '../../../providers/generalProvider';
import { Carousel } from 'react-responsive-carousel';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import "./refItem.scss";
import fullScreen from '../../../assets/SVG/mobile/comun/pantallaCompleta.svg';
import closeFullScreen from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import { getConsultants } from '../../../api-requests/requests';
import Header from '../../common/Header/Header';
import check from '../../../assets/SVG/mobile/comun/check.svg';
import send from '../../../assets/SVG/mobile/comun/flechaEnviar.svg';
import MapItem from '../../common/MapItem/MapItem';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Geocode from "react-geocode";
import googleKey from '../../../Keys.js'

Geocode.setApiKey({googleKey});
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const RefItem = () => {
    const [state, setState] = useContext(generalContext);
    const [consultants, setConsultants] = useState([]);
    const [viewFullScreen, setViewFullScreen] = useState(false);
    const [viewMap, setViewMap] = useState(false);
    const [state2, setState2] = useState()

    useState(() => {
        setState(state)
        Geocode.fromAddress("Eiffel Tower").then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
            )
        },[])
        
    useEffect(() => {
        window.scroll({
            top:0
        })
    },[])

    useEffect(() => {
        const localState = window.localStorage.getItem('storedState2')
        if (localState === null) {
            window.localStorage.setItem(
                'storedState2', JSON.stringify(state)
            )
        }else{
            return null
        }
    },[state])

    useEffect (() => {
        const localState = window.localStorage.getItem('storedState2')
        if (localState) {
            const item = JSON.parse(localState)
            setState2(item)
        }
    },[])
    
    useEffect (() => {
        getConsultants().then(itemConsultants => {
            setConsultants(itemConsultants)
        })
    },[])
    
    const toggleFullScreen = () => {
        setViewFullScreen(!viewFullScreen)
    }
    const toggleMap = () => {
        setViewMap(!viewMap)
    }

    const initialValues = {
        nombre:'',
        apellidos:'',        
        email:'',
        telefono:'',
        mensaje:''
    }
    const validationSchema = yup.object({
        nombre: yup
            .string('')
            .required('Este campo es obligatorio'),
        apellidos: yup
            .string('')
            .required('Este campo es obligatorio'),
        email: yup
            .string('')
            .required('Este campo es obligatorio')
            .email('El email no es válido'),
        telefono: yup
            .string('')
            .required('Este campo es obligatorio'),
        mensaje: yup
            .string('')
    })
    const viewValues = (values) => {
        console.log(values)
    }

    return (
        <div className='refItem'>
            {typeof state2 !== 'undefined' ? 
                <div>
                    <Header/>
                    <Carousel 
                        className='refItem__carousel'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        <img className='refItem__carousel__images' src={state2.images.main} alt={state2.title}/>
                        {state2.images.others.map((image)=> (
                            <img className='refItem__carousel__images' key={state2._id} src={image} alt={state2.title}/>
                        ))}
                    </Carousel>
                    {viewFullScreen === true ? 
                        <div className='refItem__fullScreen'>
                            <button onClick={toggleFullScreen} className='refItem__fullScreen__close'><img src={closeFullScreen} alt='close full screen'/></button>
                            <Carousel 
                                className='refItem__fullScreen__carousel'
                                showArrows={true}
                                showThumbs={false}
                                infiniteLoop={true}
                            >
                                <img className='carouselImages' src={state2.images.main} alt={state2.title}/>
                                {state2.images.others.map((image)=> (
                                    <img className='carouselImages' key={state2._id} src={image} alt={state2.title}/>
                                ))}
                            </Carousel>
                        </div>
                    : null
                    }
                    {viewMap === true ?
                        <div className='refItem__fullScreen'>
                            <button onClick={toggleMap} className='refItem__map__close'><img src={closeFullScreen} alt='close full screen'/></button>
                            <Carousel 
                                className='refItem__fullScreen__carousel'
                                showArrows={true}
                                showThumbs={false}
                                infiniteLoop={true}
                            >
                                {state2.images.blueprint.map((image)=> (
                                    <img className='carouselImages' key={state2.name} src={image} alt={state2.title}/>
                                ))}
                            </Carousel>
                        </div>
                    :null
                    }
                    <p className='refItem__ref'>Ref. {state2.adReference}</p>
                    <div className='refItem__description'>
                        <div className='refItem__description__principal'>
                            <button onClick={toggleFullScreen} ><img src={fullScreen} alt='full screen'/></button>
                            <h2 className='refItem__description__principal__price'>{state2.adType.map(type => type==='Venta') ? `${state2.sale.saleValue} €` : `${state2.sale.saleValue} €/mes`}</h2>
                            <h2 className='refItem__description__principal__title'>{state2.title}</h2>
                            <h3>{state2.adDirection.address.street}</h3>
                        </div>
                        {state2.adType.map(item => 
                            item === 'Alquiler' ? 
                            <div className={state2.expensesIncluded !== 0 && state2.monthlyRent !== 0 && state2.expenses !== 0 ?'refItem__description__rent' : 'refItem__description__rentEmpty'}>
                            <h3 className='refItem__description__rent__title'>Alquiler</h3>
                                {state2.expensesIncluded !== 0 ? 
                                    <div className='refItem__description__rent__price'>
                                        <h4>{state2.expensesIncluded}</h4>
                                        <p>Renta €/m<sup>2</sup>/mes</p>
                                        <p>gastos incluidos</p>
                                    </div>:null
                                }
                                <div className='refItem__description__rent__expenses'>
                                    {state2.monthlyRent !== 0 ? 
                                        <div>
                                            <h4>{state2.monthlyRent}</h4>
                                            <p>Renta €/m<sup>2</sup></p>
                                        </div>:null
                                    }
                                    {state2.expenses !== 0 ?
                                        <div>
                                            <h4>{state2.expenses}</h4>
                                            <p>Gastos €/m<sup>2</sup>/mes</p>
                                        </div>:null
                                    }
                                </div>
                            </div>
                            :null
                        )}
                        <div className='refItem__description__web'>
                            <h2>Descripción</h2>
                            <p>{state2.description.web}</p>
                        </div>
                        <div className='refItem__description__distribution'>
                            <h2>Distribución</h2>
                            <p>{state2.description.distribution}</p>
                            <button onClick={toggleMap}>Ver plano</button>
                        </div>
                        <div className='refItem__description__numbers'>
                            {state2.department === 'Patrimonio' ? 
                            <div>
                                <div className='refItem__description__numbers'>
                                    {state2.buildSurface !== 0 ? 
                                        <div className='refItem__description__numbers__build'>
                                            <p className='refItem__description__numbers__build__data'>{state2.buildSurface}</p>
                                            <p>m<sup>2</sup> construidos</p>
                                        </div>
                                    : null}
                                    {state2.quality.parking !== 0 ? 
                                        <div className='refItem__description__numbers__bed'>
                                            <p className='refItem__description__numbers__bed__data'>{state2.quality.parking}</p>
                                            <p>Plazas de garaje</p>
                                        </div>
                                    : null}
                                    {state2.quality.jobPositions !== 0 ? 
                                        <div className='refItem__description__numbers__bath'>
                                            <p className='refItem__description__numbers__bath__data'>{state2.quality.jobPositions}</p>
                                            <p>Puestos de trabajo</p>
                                        </div>
                                    : null}
                                </div>
                            </div>
                            :
                            <div className='refItem__description__numbers'>
                                {state2.plotSurface!==0 ? 
                                    <div className='refItem__description__numbers__plot'>
                                        <p className='refItem__description__numbers__plot__data'>{state2.plotSurface}</p>
                                        <p>m<sup>2</sup> de parcela.</p>
                                    </div>
                                :null}
                                {state2.buildSurface!==0 ? 
                                    <div className='refItem__description__numbers__build'>
                                        <p className='refItem__description__numbers__build__data'>{state2.buildSurface}</p>
                                        <p>m<sup>2</sup> construidos.</p>
                                    </div>
                                :null}
                                {state2.quality.bedrooms!==0 ? 
                                    <div className='refItem__description__numbers__bed'>
                                        <p className='refItem__description__numbers__bed__data'>{state2.quality.bedrooms}</p>
                                        <p>Habitaciones</p>
                                    </div>
                                :null}
                                {state2.quality.bathrooms!==0 ? 
                                    <div className='refItem__description__numbers__bath'>
                                        <p className='refItem__description__numbers__bath__data'>{state2.quality.bathrooms}</p>
                                        <p>Baños</p>
                                    </div>
                                : null}
                                {state2.quality.parking!==0 ? 
                                    <div className='refItem__description__numbers__bath'>
                                        <p className='refItem__description__numbers__bath__data'>{state2.quality.parking}</p>
                                        <p>Garaje</p>
                                    </div>
                                :null}
                            </div>
                            }
                        </div>
                        <div className='refItem__description__extras'>
                            {state2.quality.others.accessControl === true ? <p> <img src={check} alt='check'/> Control de accesos</p> : null}
                            {state2.quality.others.airConditioning === true ? <p> <img src={check} alt='check'/> Aire acondicionado</p> : null}
                            {state2.quality.others.centralHeating === true ? <p> <img src={check} alt='check'/> Calefacción central</p> : null}
                            {state2.quality.others.centralVacuum === true ? <p> <img src={check} alt='check'/> Aspiración centralizada</p> : null}
                            {state2.quality.others.dumbwaiter === true ? <p> <img src={check} alt='check'/> Montaplatos</p> : null}
                            {state2.quality.others.falseCeiling === true ? <p> <img src={check} alt='check'/> Falso techo</p> : null}
                            {state2.quality.others.freeHeight === true ? <p> <img src={check} alt='check'/> Altura libre 2.5m</p> : null}
                            {state2.quality.others.fullHoursSecurity === true ? <p> <img src={check} alt='check'/> Seguridad 24h</p> : null}
                            {state2.quality.others.garage === true ? <p> <img src={check} alt='check'/> Garaje</p> : null}
                            {state2.quality.others.gunRack === true ? <p> <img src={check} alt='check'/> Armero</p> : null}
                            {state2.quality.others.homeAutomation === true ? <p> <img src={check} alt='check'/> Domótica</p> : null}
                            {state2.quality.others.indoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma interior</p> : null}
                            {state2.quality.others.lift === true ? <p> <img src={check} alt='check'/> Ascensor</p> : null}
                            {state2.quality.others.liftTruck === true ? <p> <img src={check} alt='check'/> Montacargas</p> : null}
                            {state2.quality.others.outdoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma perimetral</p> : null}
                            {state2.quality.others.padelCourt === true ? <p> <img src={check} alt='check'/> Pista de pádel</p> : null}
                            {state2.quality.others.qualityBathrooms === true ? <p> <img src={check} alt='check'/> Baños</p> : null}
                            {state2.quality.others.smokeOutlet === true ? <p> <img src={check} alt='check'/> Salida de humos</p> : null}
                            {state2.quality.others.storage === true ? <p> <img src={check} alt='check'/> Trastero</p> : null}
                            {state2.quality.others.strongBox === true ? <p> <img src={check} alt='check'/> Caja fuerte</p> : null}
                            {state2.quality.others.subFloorHeating === true ? <p> <img src={check} alt='check'/> Suelo radiante</p> : null}
                            {state2.quality.others.swimmingPool === true ? <p> <img src={check} alt='check'/> Piscina</p> : null}
                            {state2.quality.others.tennisCourt === true ? <p> <img src={check} alt='check'/> Pista de tenis</p> : null}
                            {state2.quality.others.terrace === true ? <p> <img src={check} alt='check'/> Terraza</p> : null}
                            {state2.quality.others.well === true ? <p> <img src={check} alt='check'/> Pozo</p> : null}
                        </div>
                        <div className='refItem__wrapper'>
                            <div className='refItem__description__owner'>
                                {consultants.map((consultant) => {
                                    return consultant.fullName === state2.consultant.fullName ? 
                                    <div key={consultant._id} className='refItem__description__owner__details'>
                                        <img src={consultant.avatar} alt={consultant.fullName}/>
                                        <p>{consultant.fullName}</p>
                                        <p>{consultant.consultantPhoneNumber}</p>
                                        <p>{consultant.consultantEmail}</p>
                                    </div> 
                                    : null
                                })}
                            </div>
                            <div className='refItem__description__form'>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema} 
                                    onSubmit={viewValues}   
                                >
                                    {({errors, touched}) => (
                                        <Form className='refItem__description__form__inputs'>
                                            <div className='refItem__description__form__wrapper'>
                                                <div className='refItem__description__form__wrapper__name'>
                                                    <div className='refItem__description__form__wrapper__name__position'>
                                                        <label className='refItem__description__form__label'>NOMBRE</label>
                                                        <Field placeholder="Escriba aquí" name="nombre"/>
                                                        {errors.nombre && touched.nombre ? (
                                                            <div>{errors.nombre}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className='refItem__description__form__wrapper__name__position'>
                                                        <label className='refItem__description__form__label'>APELLIDOS</label>
                                                        <Field placeholder="Escriba aquí" name="apellidos"/>
                                                        {errors.apellidos && touched.apellidos ? (
                                                            <div>{errors.apellidos}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className='refItem__description__form__wrapper__contact'>
                                                    <div className='refItem__description__form__wrapper__contact__position'>
                                                        <label className='refItem__description__form__label'>EMAIL</label>
                                                        <Field placeholder="ejemplo@gmail.eu" name="email"/>
                                                        {errors.email && touched.email ? (
                                                            <div>{errors.email}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className='refItem__description__form__wrapper__contact__position'>
                                                        <label className='refItem__description__form__label'>TELÉFONO</label>
                                                        <Field placeholder="Escriba aquí" name="telefono"/>
                                                        {errors.telefono && touched.telefono ? (
                                                            <div>{errors.telefono}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='refItem__description__form__wrapper__position'>
                                                <label className='refItem__description__form__label'>MENSAJE</label>
                                                <Field placeholder="Escriba aquí" name="mensaje"/>
                                                <p>Al compartir sus datos, está aceptando nuestros términos de uso y privacidad.</p>
                                            </div>
                                            <button className='refItem__description__form__button' type='submit'>Enviar <span><img src={send} alt='enviar'/></span></button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className='refItem__description__locationMap'>
                            <MapItem/>
                        </div>
                    </div>
                </div> : null
            }
        </div>
    )  
}

export default RefItem

