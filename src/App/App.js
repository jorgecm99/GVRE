//import logo from '../assets/logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import routes from '../config/routes.js';
import logo from '../assets/logo.svg'

import ProviderRes from '../providers/generalProvider';

import Footer from '../components/common/Footer/Footer';

const Home = lazy(() => import ('../components/pages/Home'));
const Residential = lazy(() => import ('../components/pages/Residential'));
const Patrimonio = lazy(() => import ('../components/pages/Patrimonio'));
const Contacto = lazy(() => import ('../components/pages/Contacto'));
const PatrimonioItem = lazy (() => import ('../components/pages/PatrimonioItem'));
const ResidentialItem = lazy (() => import ('../components/pages/ResidentialItem'));
const Equipo = lazy (() => import ('../components/pages/Equipo'));
const Contextual = lazy (() => import ('../components/pages/Contextuales'));
const FilterResidential = lazy(() => import ('../components/pages/FiltroResidencial/NuevoResidential'));
const FilterPatrimonial = lazy(() => import ('../components/pages/FiltroPatrimonio'));
const Costa = lazy(() => import ('../components/pages/Costa'));
const CampoRustico = lazy(() => import ('../components/pages/CampoRustico'));
const ActivosSingulares = lazy(() => import ('../components/pages/ActivosSingulares'));
const Aviso = lazy(() => import ('../components/pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import ('../components/pages/PoliticaPrivacidad'));

const App = () => {
  return (
    <div className='main'>
      <div className='body'>
        <Suspense fallback={
          <div className='loader'> 
            <img 
              src={logo}
              alt='Loader'/>
          </div>
        }>
          <ProviderRes>
            <Routes>
              <Route exact path={routes.Residential} element={<Residential/>}/>
              <Route exact path={routes.ItemResidential} element={<ResidentialItem/>}/>
              <Route exact path={routes.Home} element={<Home/>}/>
              <Route exact path={routes.Patrimonial} element={<Patrimonio/>}/>
              <Route exact path={routes.Contact} element ={<Contacto/>}/>
              <Route exact path={routes.ItemPatrimonial} element={<PatrimonioItem/>}/>
              <Route exact path={routes.Team} element={<Equipo/>}/>
              <Route exact path={routes.Contextual} element={<Contextual/>}/>
              <Route exact path={routes.FilterResidential} element={<FilterResidential/>}/>
              <Route exact path={routes.FilterPatrimonial} element={<FilterPatrimonial/>}/>
              <Route exact path={routes.Costa} element={<Costa/>}/>
              <Route exact path={routes.Rustico} element={<CampoRustico/>}/>
              <Route exact path={routes.Singular} element={<ActivosSingulares/>}/>
              <Route exact path={routes.Aviso} element={<Aviso/>}/>
              <Route exact path={routes.Politica} element={<PoliticaPrivacidad/>}/>
            </Routes>
          </ProviderRes>
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
