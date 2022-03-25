import React, { useEffect, useState } from 'react';
import { getConsultants } from '../../../api-requests/requests';
import './equipo.scss';
import Header from '../../common/Header/Header';
import ContactIndex from '../../common/ContactInfo/ContactIndex'

const Equipo = () => {

    const [owners, setOwners] = useState ([])

    useEffect(() => {
        getConsultants().then(items => {
            setOwners(items)
            console.log(items)
        })
    }, [])

    useEffect(() => {
        window.scroll({
            top:0
        })
    })

    return (
        <div className='equipo'>
            <Header/>
            <h1 className='equipo__title'>Equipo</h1>
            <p className='equipo__text'>En GV Real Estate nos esforzamos al máximo por cumplir sus expectativas y brindarle un servicio exclusivo y personalizado. </p>
            <p className='equipo__text'>Nuestra empresa cuenta con los mejores profesionales del sector para asesorarle siempre que lo necesite.</p>
            <div className='equipo__owners'>
                {owners.map(owner=> 
                    owner.showOnWeb === 'Yes' ?
                    <div className='equipo__owners__owner'>
                        <img src={owner.avatar} alt={owner.fullName}/>
                        <h3>{owner.fullName}</h3>
                        <h4>{owner.consultantEmail}</h4>
                    </div>:null
                        
                )}
            </div>
            <ContactIndex/>
        </div>
    )
}

export default Equipo
