import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import AcessarConta from './pages/AcessarConta';
import CadastrarConta from './pages/CadastrarConta';
import Administracao from './pages/Administracao';



export default function Main() {
  return (
    <Routes>
        
        <Route
            path="/inicio"
            element={ <Inicio /> }
        />

        <Route
            path="/adm"
            element={ <Administracao /> }
        />

        <Route
            path="/"
            exact
            element={ <AcessarConta /> }
        />

        <Route
            path="/cadastrar-conta"
            element={ <CadastrarConta /> }
        />
    
    </Routes>
  )
}
