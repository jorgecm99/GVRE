import React, {useContext, useState, useEffect, useRef} from 'react';
import { generalContext } from '../../../providers/generalProvider';
import { Carousel } from 'react-responsive-carousel';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import "./residentialItem.scss";
import fullScreen from '../../../assets/SVG/mobile/comun/pantallaCompleta.svg';
import closeFullScreen from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import { getConsultants } from '../../../api-requests/requests';
import Header from '../../common/Header/Header';
import check from '../../../assets/SVG/mobile/comun/check.svg';
import send from '../../../assets/SVG/mobile/comun/flechaEnviar.svg';
import MapItem from '../../common/MapItem/MapItem';
import Geocode from "react-geocode";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import googleKey from '../../../Keys.js';
import emailjs from 'emailjs-com';
import { getResidentialItem } from '../../../api-requests/requests';
import { BarLoader } from 'react-spinners';


Geocode.setApiKey(googleKey.googleKey);
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const ResidentialItem = () => {
    const [state, setState] = useContext(generalContext);
    const [consultants, setConsultants] = useState([]);
    const [viewFullScreen, setViewFullScreen] = useState(false);
    const [viewMap, setViewMap] = useState(false);
    const form = useRef();
    const [viewForm, setViewForm] = useState(true);
    const [list, setList] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        let id = window.location.href.split('/')[4]
        getResidentialItem(id).then(items=> {
            setList(items)
            setIsLoading(true)
        })        
    },[])

    useEffect(() => {
        let id = window.location.href.split('/')[4]
        list.map(item => {
            if(item._id === id){
                setState(item)
                setTimeout(
                    Geocode.fromAddress(`${item.adDirection.address.street}${item.adDirection.address.directionNumber}, ${item.adDirection.city}`).then(
                        (response) => {
                            const { lat, lng } = response.results[0].geometry.location;
                            setLatitude(lat+0.0013)
                            setLongitude(lng+0.0013)
                        },
                        (error) => {
                            console.error(error);
                        }
                    ),10000
                )
            }
            return item
        })
    },[list, setState])

    useEffect(() => {
        window.scroll({
            top:0
        })
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
            .string(''),
        referencia: yup
            .string('')
    })

    const sendEmail = (e) => {
        emailjs.sendForm('gmail', 'template_zpo7p8a', form.current, 'd0RpjhV6JfLsc5KLH')
        .then((result) => {
            setViewForm(!viewForm)
            return (result)
        }, (error) => {
            alert('El email no se ha podido enviar correctamente, intentelo de nuevo más tarde, disculpe las molestias.');
            return(error)
        });
    }

    const toggleForm = () => {
        setViewForm(!viewForm)
    }
    
    return (
        <div className='residentialItem'>
            {state.images? 
                <div>
                    <Header/>
                    {isLoading ?
                    <Carousel 
                        className='residentialItem__carousel'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                        useKeyboardArrows={true}
                        autoFocus={true}
                    >
                        <img className='residentialItem__carousel__images custom-objetc-fit' src={state.images.main} alt={state.title} loading="lazy"/>
                        {state.images.others.map((image)=> (
                            <img className='residentialItem__carousel__images' key={state._id} src={image} alt={state.title} loading="lazy"/>
                        ))}
                    </Carousel>
                    :<div className='spinnerBar'>  
                            <BarLoader color="#000000" width='80px' height='2px' className='barloader'/>
                        </div>
                        }
                    {viewFullScreen === true ? 
                        <div className='residentialItem__fullScreen'>
                            <button onClick={toggleFullScreen} className='residentialItem__fullScreen__close'><img src={closeFullScreen} alt='close full screen'/></button>
                            <Carousel 
                                className='residentialItem__fullScreen__carousel'
                                showArrows={true}
                                showThumbs={false}
                                infiniteLoop={true}
                                showStatus={false}
                                useKeyboardArrows={true}
                                autoFocus={true}
                            >
                                <img className='carouselImages' src={state.images.main} alt={state.title} loading="lazy"/>
                                {state.images.others.map((image)=> (
                                    <img className='carouselImages' key={state._id} src={image} alt={state.title} loading="lazy"/>
                                ))}
                            </Carousel>
                        </div>
                    : null
                    }
                    {viewMap === true ?
                        <div className='residentialItem__fullScreen'>
                            <button onClick={toggleMap} className='residentialItem__map__close'><img src={closeFullScreen} alt='close full screen'/></button>
                            <Carousel 
                                className='residentialItem__fullScreen__carousel'
                                showArrows={true}
                                showThumbs={false}
                                infiniteLoop={true}
                                showStatus={false}
                                useKeyboardArrows={true}
                                autoFocus={true}
                            >
                                {state.images.blueprint.map((image)=> (
                                    <img className='carouselImages custom-map-size' key={state.name} src={image} alt={state.title}/>
                                ))}
                            </Carousel>
                        </div>
                    :null
                    }
                    <p className='residentialItem__ref'>Ref. {state.adReference}</p>
                    <div className='residentialItem__description'>
                        <div className='residentialItem__description__principal'>
                            <button onClick={toggleFullScreen} ><img src={fullScreen} alt='full screen'/></button>
                            {state.adType.length === 1 ? 
                                <h2 className='residentialItem__description__principal__price'>{state.adType.map(type => 
                                    type==='Venta' && state.sale.saleShowOnWeb===true && state.sale.saleValue !== 0 ? 
                                    `${new Intl.NumberFormat('de-DE').format(state.sale.saleValue)} €`:
                                    type==='Alquiler' && state.rent.rentShowOnWeb===true && state.rent.rentValue !== 0 ?
                                    `${new Intl.NumberFormat('de-DE').format(state.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='residentialItem__description__principal__prices'>
                                    {state.sale.saleShowOnWeb && state.sale.saleValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(state.sale.saleValue)} €`}</p>:null}
                                    {state.rent.rentShowOnWeb && state.rent.rentValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(state.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }                               
                        <h1 className='residentialItem__description__principal__title'>{state.title}</h1>
                        <h3>{state.webSubtitle}</h3>
                        </div>
                        {state.adType.map(item => 
                        item === 'Alquiler' ? 
                        <div className={state.expensesIncluded !== 0 && state.monthlyRent !== 0 && state.expenses !== 0 ?'residentialItem__description__rent' : 'residentialItem__description__rentEmpty'}>
                            <h3 className='residentialItem__description__rent__title'>Alquiler</h3>
                            <div className={state.expensesIncluded !== 0 && state.monthlyRent !== 0 && state.expenses !== 0 ?'residentialItem__description__rent__numbers' : 'residentialItem__description__rentEmpty__numbers'}>
                            {state.expensesIncluded !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.expensesIncluded)}`}</h4>
                                        <p>Renta €/m<sup>2</sup>/mes</p>
                                        <p>gastos incluidos</p>
                                    </div>:null
                                }
                                {state.monthlyRent !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.monthlyRent)}`}</h4>
                                        <p>Renta €/m<sup>2</sup></p>
                                    </div>:null
                                }
                                {state.expenses !== 0 ?
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.expenses)}`}</h4>
                                        <p>Gastos €/m<sup>2</sup>/mes</p>
                                    </div>:null
                                }
                            </div>
                        </div>
                        :null
                    )}
                        {state.description.web !== '' ? 
                            <div className='residentialItem__description__web'>
                                <h2>Descripción</h2>
                                <p>{state.description.web}</p>
                            </div>:null
                        }
                        <div className='residentialItem__description__distribution'>
                            {state.description.distribution !== '' ? <h2>Distribución</h2> : null}
                            {state.description.distribution !== '' ? <p>{state.description.distribution}</p>:null}
                            {state.images.blueprint.length!== 0 ?
                                <button onClick={toggleMap}>Ver plano</button>
                                :null
                            }
                        </div>
                        <div className='residentialItem__description__numbers'>
                            <div>
                                {state.plotSurface!==0 ? 
                                    <div className='residentialItem__description__numbers__plot'>
                                        <p className='residentialItem__description__numbers__plot__data'>{state.plotSurface}</p>
                                        <p>m<sup>2</sup> de parcela.</p>
                                    </div>
                                :null}
                                {state.buildSurface!==0 ? 
                                    <div className='residentialItem__description__numbers__build'>
                                        <p className='residentialItem__description__numbers__build__data'>{state.buildSurface}</p>
                                        <p>m<sup>2</sup> construidos.</p>
                                    </div>
                                :null}
                                {state.quality.bedrooms!==0 ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data'>{state.quality.bedrooms}</p>
                                        <p>Habitaciones</p>
                                    </div>
                                :null}
                                {state.quality.bathrooms!==0 ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data'>{state.quality.bathrooms}</p>
                                        <p>Baños</p>
                                    </div>
                                : null}
                                {state.quality.parking!==0 ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data'>{state.quality.parking}</p>
                                        <p>Garaje</p>
                                    </div>
                                :null}
                            </div>
                            <div>
                                {state.floor!=='' ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data custom-numbers-size'>{state.floor}</p>
                                        <p>Planta</p>
                                    </div>
                                :null}
                                {state.disponibility!=='' ? 
                                    <div className='residentialItem__description__numbers__bath'>
                                        <p className='residentialItem__description__numbers__bath__data custom-numbers-size'>{state.disponibility}</p>
                                        <p>Disponibilidad</p>
                                    </div>
                                :null}
                            </div>
                            <div>
                                {state.ibi.ibiValue!==0 && state.ibi.ibiShowOnWeb===true ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data'>{state.ibi.ibiValue}</p>
                                        <p>IBI €/año</p>
                                    </div>
                                :null}
                                {state.communityExpenses.expensesValue!==0 && state.communityExpenses.expensesShowOnWeb===true ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data'>{state.communityExpenses.expensesValue}</p>
                                        <p>Gastos de comunidad €/mes</p>
                                    </div>
                                :null}
                            </div>
                            <div>
                                {state.quality.subway!=='' ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data custom-numbers-size'>{state.quality.subway}</p>
                                        <p>Metro</p>
                                    </div>
                                :null}
                                {state.quality.bus!=='' ? 
                                    <div className='residentialItem__description__numbers__bed'>
                                        <p className='residentialItem__description__numbers__bed__data custom-numbers-size'>{state.quality.bus}</p>
                                        <p>Autobús</p>
                                    </div>
                                :null}
                            </div>
                        </div>
                        <div className='residentialItem__description__extras'>
                            {state.quality.others.accessControl === true ? <p> <img src={check} alt='check'/> Control de accesos</p> : null}
                            {state.quality.others.airConditioning === true ? <p> <img src={check} alt='check'/> Aire acondicionado</p> : null}
                            {state.quality.others.centralHeating === true ? <p> <img src={check} alt='check'/> Calefacción central</p> : null}
                            {state.quality.others.centralVacuum === true ? <p> <img src={check} alt='check'/> Aspiración centralizada</p> : null}
                            {state.quality.others.dumbwaiter === true ? <p> <img src={check} alt='check'/> Montaplatos</p> : null}
                            {state.quality.others.falseCeiling === true ? <p> <img src={check} alt='check'/> Falso techo</p> : null}
                            {state.quality.others.freeHeight === true ? <p> <img src={check} alt='check'/> Altura libre 2.5m</p> : null}
                            {state.quality.others.fullHoursSecurity === true ? <p> <img src={check} alt='check'/> Seguridad 24h</p> : null}
                            {state.quality.others.garage === true ? <p> <img src={check} alt='check'/> Garaje</p> : null}
                            {state.quality.others.gunRack === true ? <p> <img src={check} alt='check'/> Armero</p> : null}
                            {state.quality.others.homeAutomation === true ? <p> <img src={check} alt='check'/> Domótica</p> : null}
                            {state.quality.others.indoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma interior</p> : null}
                            {state.quality.others.lift === true ? <p> <img src={check} alt='check'/> Ascensor</p> : null}
                            {state.quality.others.liftTruck === true ? <p> <img src={check} alt='check'/> Montacargas</p> : null}
                            {state.quality.others.outdoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma perimetral</p> : null}
                            {state.quality.others.padelCourt === true ? <p> <img src={check} alt='check'/> Pista de pádel</p> : null}
                            {state.quality.others.qualityBathrooms === true ? <p> <img src={check} alt='check'/> Baños</p> : null}
                            {state.quality.others.smokeOutlet === true ? <p> <img src={check} alt='check'/> Salida de humos</p> : null}
                            {state.quality.others.storage === true ? <p> <img src={check} alt='check'/> Trastero</p> : null}
                            {state.quality.others.strongBox === true ? <p> <img src={check} alt='check'/> Caja fuerte</p> : null}
                            {state.quality.others.subFloorHeating === true ? <p> <img src={check} alt='check'/> Suelo radiante</p> : null}
                            {state.quality.others.swimmingPool === true ? <p> <img src={check} alt='check'/> Piscina</p> : null}
                            {state.quality.others.tennisCourt === true ? <p> <img src={check} alt='check'/> Pista de tenis</p> : null}
                            {state.quality.others.terrace === true ? <p> <img src={check} alt='check'/> Terraza</p> : null}
                            {state.quality.others.well === true ? <p> <img src={check} alt='check'/> Pozo</p> : null}
                            {state.quality.others.raisedFloor === true ? <p> <img src={check} alt='check'/> Suelo técnico</p> : null}
                        </div>
                        <div className='residentialItem__wrapper'>
                            <div className='residentialItem__description__owner'>
                                {consultants.map((consultant) => {
                                    return consultant.fullName === state.consultant.fullName ? 
                                    <div key={consultant._id} className='residentialItem__description__owner__details'>
                                        <img src={consultant.avatar} alt={consultant.fullName}/>
                                        <p>{consultant.fullName}</p>
                                        <p>{consultant.consultantPhoneNumber}</p>
                                        <p>{consultant.consultantEmail}</p>
                                    </div> 
                                    : null
                                })}
                            </div>
                            <div className='residentialItem__description__form'>
                                {viewForm === true ? 
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema} 
                                        onSubmit={sendEmail}   
                                    >
                                        {({errors, touched}) => (
                                            <Form ref={form} className='residentialItem__description__form__inputs'>
                                                <div className='residentialItem__description__form__wrapper'>
                                                    <div className='residentialItem__description__form__wrapper__name'>
                                                        <div className='residentialItem__description__form__wrapper__name__position'>
                                                            <label className='residentialItem__description__form__label'>NOMBRE</label>
                                                            <Field placeholder="Escriba aquí" name="nombre"/>
                                                            {errors.nombre && touched.nombre ? (
                                                                <div>{errors.nombre}</div>
                                                            ) : null}
                                                        </div>
                                                        <div className='residentialItem__description__form__wrapper__name__position'>
                                                            <label className='residentialItem__description__form__label'>APELLIDOS</label>
                                                            <Field placeholder="Escriba aquí" name="apellidos"/>
                                                            {errors.apellidos && touched.apellidos ? (
                                                                <div>{errors.apellidos}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className='residentialItem__description__form__wrapper__contact'>
                                                        <div className='residentialItem__description__form__wrapper__contact__position'>
                                                            <label className='residentialItem__description__form__label'>EMAIL</label>
                                                            <Field placeholder="ejemplo@gmail.eu" name="email"/>
                                                            {errors.email && touched.email ? (
                                                                <div>{errors.email}</div>
                                                            ) : null}
                                                        </div>
                                                        <div className='residentialItem__description__form__wrapper__contact__position'>
                                                            <label className='residentialItem__description__form__label'>TELÉFONO</label>
                                                            <Field placeholder="Escriba aquí" name="telefono"/>
                                                            {errors.telefono && touched.telefono ? (
                                                                <div>{errors.telefono}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='residentialItem__description__form__wrapper__position'>
                                                    <label className='residentialItem__description__form__label'>MENSAJE</label>
                                                    <Field placeholder="Escriba aquí" name="mensaje"/>
                                                    <p>Al compartir sus datos, está aceptando nuestros términos de uso y privacidad.</p>
                                                </div>
                                                <div className='residentialItem__description__form__wrapper__position__reference'>
                                                    <label className='residentialItem__description__form__label'>Referencia</label>
                                                    <Field name="referencia" value={state.adReference}/>
                                                </div>
                                                <button className='residentialItem__description__form__button' type='submit'>Enviar <span><img src={send} alt='enviar'/></span></button>
                                            </Form>
                                        )}
                                    </Formik>
                                    :
                                    <div className='residentialItem__description__form__return'>
                                        <p>Gracias por contactar con nosotros, en breve nos pondremos en contacto</p>
                                        <button onClick={toggleForm}>Volver al formulario</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='residentialItem__description__filter'></div>
                        <div className='residentialItem__description__locationMap'>
                            <MapItem long={longitude} lati={latitude}/>
                        </div>
                    </div>
                </div>
            :null}
        </div>
    )
}

export default ResidentialItem
