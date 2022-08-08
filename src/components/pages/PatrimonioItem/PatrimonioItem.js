import React, {useContext, useState, useEffect, useRef} from 'react'
import { generalContext } from '../../../providers/generalProvider'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import "./patrimonioItem.scss"
import fullScreen from '../../../assets/SVG/mobile/comun/pantallaCompleta.svg';
import closeFullScreen from '../../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import check from '../../../assets/SVG/mobile/comun/check.svg';
import { getConsultants } from '../../../api-requests/requests';
import Header from '../../common/Header/Header';
import send from '../../../assets/SVG/mobile/comun/flechaEnviar.svg';
import Geocode from "react-geocode";
import googleKey from '../../../Keys.js';
import emailjs from 'emailjs-com';
import { getPatrimonialItem } from '../../../api-requests/requests';
import MapItem from '../../common/MapItem/MapItem'

Geocode.setApiKey(googleKey.googleKey);
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const PatrimonioItem = () => {
    const [state, setState] = useContext(generalContext);
    const [consultants, setConsultants] = useState([]);
    const [viewFullScreen, setViewFullScreen] = useState(false)
    const [viewMap, setViewMap] = useState(false);
    const form = useRef();
    const [viewForm, setViewForm] = useState(true)
    const [list, setList] = useState([])
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        let id = window.location.href.split('/')[4]
        getPatrimonialItem(id).then(items=> {
            setList(items)
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
        <div className='patrimonialItem'>
            {state.images ?
            <div>
                <Header/>
                <Carousel 
                    className='patrimonialItem__carousel'
                    showArrows={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    showStatus={false}
                    useKeyboardArrows={true}
                    autoFocus={true}
                >
                    <img className='patrimonialItem__carousel__images custom-objetc-fit' src={state.images.main} alt={state.title} loading="lazy"/>
                    {state.images.others.map((image)=> (
                        <img className='patrimonialItem__carousel__images' key={state._id} src={image} alt={state.title} loading="lazy"/>
                    ))}
                </Carousel>
                {viewFullScreen === true ? 
                    <div className='patrimonialItem__fullScreen'>
                        <button onClick={toggleFullScreen} className='patrimonialItem__fullScreen__close'><img src={closeFullScreen} alt='close full screen'/></button>
                        <Carousel 
                            className='patrimonialItem__fullScreen__carousel'
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
                    <div className='patrimonialItem__map'>
                        <button onClick={toggleMap} className='patrimonialItem__map__close'><img src={closeFullScreen} alt='close full screen'/></button>
                        <Carousel 
                            className='patrimonialItem__fullScreen__carousel'
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
                <p className='patrimonialItem__ref'>Ref. {state.adReference}</p>
                <div className='patrimonialItem__description'>
                    <div className={state.expensesIncluded !== 0 && state.monthlyRent !== 0 && state.expenses !== 0 ?'patrimonialItem__description__principal' : 'patrimonialItem__description__principalEmpty'}>
                        <img onClick={toggleFullScreen} src={fullScreen} alt='full screen'/>
                            {state.adType.length === 1 ? 
                                <h2 className='patrimonialItem__description__principal__price'>{state.adType.map(type => 
                                    type==='Venta' && state.sale.saleShowOnWeb===true && state.sale.saleValue !== 0 ? 
                                    `${new Intl.NumberFormat('de-DE').format(state.sale.saleValue)} €`:
                                    type==='Alquiler' && state.rent.rentShowOnWeb===true && state.rent.rentValue !== 0 ?
                                    `${new Intl.NumberFormat('de-DE').format(state.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='patrimonialItem__description__principal__prices'>
                                    {state.sale.saleShowOnWeb && state.sale.saleValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(state.sale.saleValue)} €`}</p>:null}
                                    {state.rent.rentShowOnWeb && state.rent.rentValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(state.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }              
                        <h1 className='patrimonialItem__description__principal__title'>{state.title}</h1>
                        <h3>{state.webSubtitle}</h3>
                    </div>
                    {state.adType.map(item => 
                        item === 'Alquiler' ? 
                        <div className={state.expensesIncluded !== 0 && state.monthlyRent !== 0 && state.expenses !== 0 ?'patrimonialItem__description__rent' : 'patrimonialItem__description__rentEmpty'}>
                            <h3 className='patrimonialItem__description__rent__title'>Alquiler</h3>
                            <div className={state.expensesIncluded !== 0 && state.monthlyRent !== 0 && state.expenses !== 0 ?'patrimonialItem__description__rent__numbers' : 'patrimonialItem__description__rentEmpty__numbers'}>
                                {state.expensesIncluded !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(Math.round(state.expensesIncluded))}`} <span className='custom-rent-numbers-patrimonio'>€/mes</span></h4>
                                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</p> */}
                                        <p>Renta con gastos incluidos</p>
                                    </div>:null
                                }
                                {state.monthlyRent !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.monthlyRent)}`} <span className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</span></h4>
                                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup></p> */}
                                        <p>Renta</p>
                                    </div>:null
                                }
                                {state.expenses !== 0 ?
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.expenses)}`} <span className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</span></h4>
                                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</p> */}
                                        <p>Gastos</p>
                                    </div>:null
                                }
                            </div>
                        </div>
                        :null
                    )}
                    {state.description.web !== '' ? 
                        <div className='patrimonialItem__description__web'>
                            <h2>Descripción</h2>
                            <p>{state.description.web}</p>
                        </div>:null
                    }
                    <div className='patrimonialItem__description__distribution'>
                        {state.images.blueprint.length!== 0 ?
                            <button onClick={toggleMap}>Ver plano</button>
                            :null
                        }                   
                    </div>
                    <div className='patrimonialItem__description__numbers'>
                        <div>
                            {state.plotSurface!==0 ? 
                                <div className='patrimonialItem__description__numbers__build'>
                                    <p className='patrimonialItem__description__numbers__build__data'>{state.plotSurface}</p>
                                    <p>m<sup>2</sup> de parcela.</p>
                                </div>
                            :null}
                            {state.buildSurface !== 0 ? 
                                <div className='patrimonialItem__description__numbers__build'>
                                    <p className='patrimonialItem__description__numbers__build__data'>{state.buildSurface}</p>
                                    <p>m<sup>2</sup> construidos</p>
                                </div>
                            : null}
                            {state.quality.parking !== 0 ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data'>{state.quality.parking}</p>
                                    <p>Plazas de garaje</p>
                                </div>
                            : null}
                            {state.quality.jobPositions !== 0 ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data'>{state.quality.jobPositions}</p>
                                    <p>Puestos de trabajo</p>
                                </div>
                            : null}
                        </div>
                        <div>
                            {state.floor!=='' ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data custom-numbers-size'>{state.floor}</p>
                                    <p>Planta</p>
                                </div>
                            :null}
                            {state.disponibility!=='' ? 
                                <div className='patrimonialItem__description__numbers__bath'>
                                    <p className='patrimonialItem__description__numbers__bath__data custom-numbers-size'>{state.disponibility}</p>
                                    <p>Disponibilidad</p>
                                </div>
                            :null}
                        </div>
                        <div>
                            {state.ibi.ibiValue!==0 && state.ibi.ibiShowOnWeb===true ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data'>{state.ibi.ibiValue}</p>
                                    <p>IBI €/año</p>
                                </div>
                            :null}
                            {state.communityExpenses.expensesValue!==0 && state.communityExpenses.expensesShowOnWeb===true ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data'>{state.communityExpenses.expensesValue}</p>
                                    <p>Gastos de comunidad €/mes</p>
                                </div>
                            :null}
                        </div>
                        <div>
                            {state.quality.subway!=='' ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data custom-numbers-size'>{state.quality.subway}</p>
                                    <p>Metro</p>
                                </div>
                            :null}
                            {state.quality.bus!=='' ? 
                                <div className='patrimonialItem__description__numbers__bed'>
                                    <p className='patrimonialItem__description__numbers__bed__data custom-numbers-size'>{state.quality.bus}</p>
                                    <p>Autobús</p>
                                </div>
                            :null}
                        </div>
                    </div>
                    {state.surfacesBox.length !== 0 ?
                        <div className='patrimonialItem__description__surfaceTable'>
                            <h3>Cuadro de superficies</h3>
                            <div className='patrimonialItem__description__surfaceTable__table'>
                                <table >
                                    <tr className='patrimonialItem__description__surfaceTable__table__titles'>
                                        <td>Planta</td>
                                        <td>Uso</td>
                                        <td>m<sup>2</sup></td>
                                        <td>Precio</td>
                                        <td>Disponibilidad</td>
                                    </tr>
                                    {state.surfacesBox.map(item => 
                                        <tr>
                                            <td>{item.surfaceFloor}</td>
                                            <td>{item.surfaceUse}</td>
                                            <td>{item.metersAvailables}</td>
                                            <td>{item.metersPrice}</td>
                                            <td>{item.surfaceDisponibility}</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    : null}
                    <div className='patrimonialItem__description__extras'>
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
                    <div className='patrimonialItem__wrapper'>
                        <div className='patrimonialItem__description__owner'>
                            {consultants.map(consultant => 
                                consultant.fullName === state.consultant.fullName ? 
                                <div key={consultant._id} className='patrimonialItem__description__owner__details'>
                                    <img src={consultant.avatar} alt={consultant.fullName}/>
                                    <p>{consultant.fullName}</p>
                                    <p>{consultant.consultantPhoneNumber}</p>
                                    <p>{consultant.consultantEmail}</p>
                                </div> 
                                : null
                            )}
                        </div>
                        <div className='patrimonialItem__description__form'>
                            {viewForm === true ? 
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema} 
                                    onSubmit={sendEmail}
                                >
                                    {({errors, touched}) => (
                                        <Form ref={form} className='patrimonialItem__description__form__inputs'>
                                        <div className='patrimonialItem__description__form__wrapper'>
                                            <div className='patrimonialItem__description__form__wrapper__name'>
                                                <div className='patrimonialItem__description__form__wrapper__name__position'>
                                                    <label className='patrimonialItem__description__form__label'>NOMBRE</label>
                                                    <Field placeholder="Escriba aquí" name="nombre"/>
                                                    {errors.nombre && touched.nombre ? (
                                                        <div>{errors.nombre}</div>
                                                    ) : null}
                                                </div>
                                                <div className='patrimonialItem__description__form__wrapper__name__position'>
                                                    <label className='patrimonialItem__description__form__label'>APELLIDOS</label>
                                                    <Field placeholder="Escriba aquí" name="apellidos"/>
                                                    {errors.apellidos && touched.apellidos ? (
                                                        <div>{errors.apellidos}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className='patrimonialItem__description__form__wrapper__contact'>
                                                <div className='patrimonialItem__description__form__wrapper__contact__position'>
                                                    <label className='patrimonialItem__description__form__label'>EMAIL</label>
                                                    <Field placeholder="ejemplo@gmail.eu" name="email"/>
                                                    {errors.email && touched.email ? (
                                                        <div>{errors.email}</div>
                                                    ) : null}
                                                </div>
                                                <div className='patrimonialItem__description__form__wrapper__contact__position'>
                                                    <label className='patrimonialItem__description__form__label'>TELÉFONO</label>
                                                    <Field placeholder="Escriba aquí" name="telefono"/>
                                                    {errors.telefono && touched.telefono ? (
                                                        <div>{errors.telefono}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='patrimonialItem__description__form__wrapper__position'>
                                            <label className='patrimonialItem__description__form__label'>MENSAJE</label>
                                            <Field placeholder="Escriba aquí" name="mensaje"/>
                                            <p>Al compartir sus datos, está aceptando nuestros términos de uso y privacidad.</p>
                                        </div>
                                        <div className='patrimonialItem__description__form__wrapper__position__reference'>
                                            <label className='patrimonialItem__description__form__label'>Referencia</label>
                                            <Field name="referencia" value={state.adReference}/>
                                        </div>
                                        <button className='patrimonialItem__description__form__button' type='submit'>Enviar <span><img src={send} alt='enviar'/></span></button>
                                    </Form>
                                    )}
                                </Formik>
                                :
                                <div className='patrimonialItem__description__form__return'>
                                    <p>Gracias por contactar con nosotros, en breve nos pondremos en contacto</p>
                                    <button onClick={toggleForm}>Volver al formulario</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='patrimonialItem__description__filter'></div>
                    <div className='patrimonialItem__description__locationMap'>
                        <MapItem long={longitude} lati={latitude}/>
                    </div>
                </div>
            </div>:null}
        </div>
    )
}

export default PatrimonioItem
