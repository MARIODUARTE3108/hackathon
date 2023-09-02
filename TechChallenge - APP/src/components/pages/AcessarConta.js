import React from 'react';
import LoginForm from '../forms/LoginForm';

export default function AcessarConta() {
  return (
    <div className='container' style={{marginTop: '150px'}}>
       <div className='row'>
            <div className='col-md-4 offset-md-4'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='text-center'>
                            <h5 className='card-title mb-3'>Acessar Blog</h5>                            
                        </div>

                        <LoginForm />

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
