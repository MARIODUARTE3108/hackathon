import React from 'react'
import CadastrarForm from '../forms/CadastrarForm'

export default function CadastrarConta() {
  return (
    <div className='container mt-3 '>
       <div className='row'>
            <div className='col-md-8 offset-md-2'>
                <div className='card'>
                    <div className='card-body'>
                            <h5 className='card-title'>Crie sua Conta</h5>
                            <p>preencha os campos para criar sua conta de usuário</p>

                        <CadastrarForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
