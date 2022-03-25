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
import MapItem from '../../common/MapItem/MapItem';
import Geocode from "react-geocode";
import googleKey from '../../../Keys.js';
import emailjs from 'emailjs-com';

Geocode.setApiKey({googleKey});
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
        if (Object.keys(state).length!==0){
            window.localStorage.setItem(
                'storedState2', JSON.stringify(state)
            )
        }
    },[state])

    useEffect(()=> {
            const local = window.localStorage.getItem('storedState2')
            const item = JSON.parse(local)
            setState(item)
    },[setState])
    
    useState(() => {
        setState(state)
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
            {state.item?
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
                    <img className='patrimonialItem__carousel__images' src={state.item.images.main} alt={state.item.title}/>
                    {state.item.images.others.map((image)=> (
                        <img className='patrimonialItem__carousel__images' key={state.item._id} src={image} alt={state.item.title}/>
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
                            <img className='carouselImages' src={state.item.images.main} alt={state.item.title}/>
                            {state.item.images.others.map((image)=> (
                                <img className='carouselImages' key={state.item._id} src={image} alt={state.item.title}/>
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
                            {state.item.images.blueprint.map((image)=> (
                                <img className='carouselImages' key={state.item.name} src={image} alt={state.item.title}/>
                            ))}
                        </Carousel>
                    </div>
                :null
                }
                <p className='patrimonialItem__ref'>Ref. {state.item.adReference}</p>
                <div className='patrimonialItem__description'>
                    <div className={state.item.expensesIncluded !== 0 && state.item.monthlyRent !== 0 && state.item.expenses !== 0 ?'patrimonialItem__description__principal' : 'patrimonialItem__description__principalEmpty'}>
                        <img onClick={toggleFullScreen} src={fullScreen} alt='full screen'/>
                            {state.item.adType.length === 1 ? 
                                <h2 className='patrimonialItem__description__principal__price'>{state.item.adType.map(type => 
                                    type==='Venta' && state.item.sale.saleShowOnWeb ? 
                                    `${new Intl.NumberFormat('de-DE').format(state.item.sale.saleValue)} €`:
                                    type==='Alquiler' && state.item.rent.rentShowOnWeb ?
                                    `${new Intl.NumberFormat('de-DE').format(state.item.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='patrimonialItem__description__principal__prices'>
                                {state.item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(state.item.sale.saleValue)} €`}</p>:null}
                                {state.item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(state.item.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }              
                        <h1 className='patrimonialItem__description__principal__title'>{state.item.title}</h1>
                        <h3>{state.item.webSubtitle}</h3>
                    </div>
                    {state.item.adType.map(item => 
                        item === 'Alquiler' ? 
                        <div className={state.item.expensesIncluded !== 0 && state.item.monthlyRent !== 0 && state.item.expenses !== 0 ?'patrimonialItem__description__rent' : 'patrimonialItem__description__rentEmpty'}>
                            <h3 className='patrimonialItem__description__rent__title'>Alquiler</h3>
                            <div className={state.item.expensesIncluded !== 0 && state.item.monthlyRent !== 0 && state.item.expenses !== 0 ?'patrimonialItem__description__rent__numbers' : 'patrimonialItem__description__rentEmpty__numbers'}>
                                {state.item.expensesIncluded !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.item.expensesIncluded)}`}</h4>
                                        <p>Renta €/m<sup>2</sup>/mes</p>
                                        <p>gastos incluidos</p>
                                    </div>:null
                                }
                                {state.item.monthlyRent !== 0 ? 
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.item.monthlyRent)}`}</h4>
                                        <p>Renta €/m<sup>2</sup></p>
                                    </div>:null
                                }
                                {state.item.expenses !== 0 ?
                                    <div>
                                        <h4>{`${new Intl.NumberFormat('de-DE').format(state.item.expenses)}`}</h4>
                                        <p>Gastos €/m<sup>2</sup>/mes</p>
                                    </div>:null
                                }
                            </div>
                        </div>
                        :null
                    )}
                    {state.item.description.web !== '' ? 
                        <div className='patrimonialItem__description__web'>
                            <h2>Descripción</h2>
                            <p>{state.item.description.web}</p>
                        </div>:null
                    }
                    <div className='patrimonialItem__description__distribution'>
                        {state.item.images.blueprint.length!== 0 ?
                            <button onClick={toggleMap}>Ver plano</button>
                            :null
                        }                   
                    </div>
                    <div className='patrimonialItem__description__numbers'>
                        {state.item.plotSurface!==0 ? 
                            <div className='patrimonialItem__description__numbers__build'>
                                <p className='patrimonialItem__description__numbers__build__data'>{state.item.plotSurface}</p>
                                <p>m<sup>2</sup> de parcela.</p>
                            </div>
                        :null}
                        {state.item.buildSurface !== 0 ? 
                            <div className='patrimonialItem__description__numbers__build'>
                                <p className='patrimonialItem__description__numbers__build__data'>{state.item.buildSurface}</p>
                                <p>m<sup>2</sup> construidos</p>
                            </div>
                        : null}
                        {state.item.quality.parking !== 0 ? 
                            <div className='patrimonialItem__description__numbers__bed'>
                                <p className='patrimonialItem__description__numbers__bed__data'>{state.item.quality.parking}</p>
                                <p>Plazas de garaje</p>
                            </div>
                        : null}
                        {state.item.quality.jobPositions !== 0 ? 
                            <div className='patrimonialItem__description__numbers__bed'>
                                <p className='patrimonialItem__description__numbers__bed__data'>{state.item.quality.jobPositions}</p>
                                <p>Puestos de trabajo</p>
                            </div>
                        : null}
                        {state.item.ibi.ibiValue!==0 && state.item.ibi.ibiShowOnWeb===true ? 
                            <div className='patrimonialItem__description__numbers__bed'>
                                <p className='patrimonialItem__description__numbers__bed__data'>{state.item.ibi.ibiValue}</p>
                                <p>IBI €/año</p>
                            </div>
                        :null}
                        {state.item.communityExpenses.expensesValue!==0 && state.item.ibi.expensesShowOnWeb===true ? 
                            <div className='patrimonialItem__description__numbers__bed'>
                                <p className='patrimonialItem__description__numbers__bed__data'>{state.item.communityExpenses.expensesValue}</p>
                                <p>Gastos de comunidad €/mes</p>
                            </div>
                        :null}
                        {state.item.floor!=='' ? 
                            <div className='patrimonialItem__description__numbers__bed'>
                                <p className='patrimonialItem__description__numbers__bed__data'>{state.item.floor}</p>
                                <p>Planta</p>
                            </div>
                        :null}
                        {state.item.disponibility!=='' ? 
                            <div className='patrimonialItem__description__numbers__bath'>
                                <p className='patrimonialItem__description__numbers__bath__data'>{state.item.disponibility}</p>
                                <p>Disponibilidad</p>
                            </div>
                        :null}
                    </div>
                    {state.item.surfacesBox.length !== 0 ?
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
                                    {state.item.surfacesBox.map(item => 
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
                        {state.item.quality.others.accessControl === true ? <p> <img src={check} alt='check'/> Control de accesos</p> : null}
                        {state.item.quality.others.airConditioning === true ? <p> <img src={check} alt='check'/> Aire acondicionado</p> : null}
                        {state.item.quality.others.centralHeating === true ? <p> <img src={check} alt='check'/> Calefacción central</p> : null}
                        {state.item.quality.others.centralVacuum === true ? <p> <img src={check} alt='check'/> Aspiración centralizada</p> : null}
                        {state.item.quality.others.dumbwaiter === true ? <p> <img src={check} alt='check'/> Montaplatos</p> : null}
                        {state.item.quality.others.falseCeiling === true ? <p> <img src={check} alt='check'/> Falso techo</p> : null}
                        {state.item.quality.others.freeHeight === true ? <p> <img src={check} alt='check'/> Altura libre 2.5m</p> : null}
                        {state.item.quality.others.fullHoursSecurity === true ? <p> <img src={check} alt='check'/> Seguridad 24h</p> : null}
                        {state.item.quality.others.garage === true ? <p> <img src={check} alt='check'/> Garaje</p> : null}
                        {state.item.quality.others.gunRack === true ? <p> <img src={check} alt='check'/> Armero</p> : null}
                        {state.item.quality.others.homeAutomation === true ? <p> <img src={check} alt='check'/> Domótica</p> : null}
                        {state.item.quality.others.indoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma interior</p> : null}
                        {state.item.quality.others.lift === true ? <p> <img src={check} alt='check'/> Ascensor</p> : null}
                        {state.item.quality.others.liftTruck === true ? <p> <img src={check} alt='check'/> Montacargas</p> : null}
                        {state.item.quality.others.outdoorAlarm === true ? <p> <img src={check} alt='check'/> Alarma perimetral</p> : null}
                        {state.item.quality.others.padelCourt === true ? <p> <img src={check} alt='check'/> Pista de pádel</p> : null}
                        {state.item.quality.others.qualityBathrooms === true ? <p> <img src={check} alt='check'/> Baños</p> : null}
                        {state.item.quality.others.smokeOutlet === true ? <p> <img src={check} alt='check'/> Salida de humos</p> : null}
                        {state.item.quality.others.storage === true ? <p> <img src={check} alt='check'/> Trastero</p> : null}
                        {state.item.quality.others.strongBox === true ? <p> <img src={check} alt='check'/> Caja fuerte</p> : null}
                        {state.item.quality.others.subFloorHeating === true ? <p> <img src={check} alt='check'/> Suelo radiante</p> : null}
                        {state.item.quality.others.swimmingPool === true ? <p> <img src={check} alt='check'/> Piscina</p> : null}
                        {state.item.quality.others.tennisCourt === true ? <p> <img src={check} alt='check'/> Pista de tenis</p> : null}
                        {state.item.quality.others.terrace === true ? <p> <img src={check} alt='check'/> Terraza</p> : null}
                        {state.item.quality.others.well === true ? <p> <img src={check} alt='check'/> Pozo</p> : null}
                        {state.item.quality.others.raisedFloor === true ? <p> <img src={check} alt='check'/> Tarima flotante</p> : null}
                        {state.item.quality.subway!=='' ? 
                            <p><img src={check} alt='check'/> Metro: {state.item.quality.subway}</p>
                        :null}
                        {state.item.quality.subway!=='' ? 
                            <p><img src={check} alt='check'/> Bus: {state.item.quality.bus}</p>
                        :null}
                    </div>
                    <div className='patrimonialItem__wrapper'>
                        <div className='patrimonialItem__description__owner'>
                            {consultants.map(consultant => 
                                consultant.fullName === state.item.consultant.fullName ? 
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
                                            <Field name="referencia" value={state.item.adReference}/>
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
                    <div className='patrimonialItem__description__locationMap'>
                        <MapItem/>
                    </div>
                </div>
            </div>:null}
        </div>
    )
}

export default PatrimonioItem
