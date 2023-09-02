import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as services from '../../services/account-services';

import emailValidation from '../../validations/email-validation';
import passwordValidation from '../../validations/password-validation';
import textValidation from '../../validations/text-validation';

export default function CadastrarForm(){
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    const {
        control,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        setMensagemSucesso('');
        setMensagemErro('');
        console.log(data)
        services.postUsuario(data)
        .then(    //retorno sucesso
            result => {
                console.log('erro',result)
                setMensagemSucesso(result.message);
                console.log(result.message)
                reset({
                    nome: '',
                    email: '',
                    senha: '',
                    senhaconfirmacao: ''
                })
            }    
        )
        .catch(      // retorno erro
            e => {
                console.log('erro',e.response.data.errors.IFormFile[0])
                switch (e.response.status) {

                    case 400:
                        if (e.response.data.errors.Senha) {
                            setMensagemErro(e.response.data.errors.Senha[0]);
                          }
                          if (e.response.data.errors.Nome) {
                            setMensagemErro(e.response.data.errors.Nome[0]);
                          }
                          if (e.response.data.errors.SenhaConfirmacao) {
                            setMensagemErro(e.response.data.errors.SenhaConfirmacao[0]);
                          }
                          if (e.response.data.errors.Email) {
                            setMensagemErro(e.response.data.errors.Email[0]);
                          }
                          if (e.response.data.errors.IFormFile) {
                            setMensagemErro(e.response.data.errors.IFormFile[0]);
                          }
                        break;
                    
                    case 422:
                        setMensagemErro(e.response.data)
                        break;
                    
                    case 500:
                        setMensagemErro(e.response.data.message)
                        break;
                        
                    default:
                        setMensagemErro('Não foi possível realizar a operação.');
                        break;    
                
                }

            }
        )

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>

            { mensagemSucesso && <div className='alert alert-success'> <strong> Sucesso! </strong> {mensagemSucesso} </div> }
            { mensagemErro && <div className='alert alert-danger'> <strong> Erro! </strong> {mensagemErro} </div> }

        <div className='row mb-3'>
            <div className='col-md-5'>

                <label>Nome de Usuário:</label>
                <Controller 
                    control={control}
                    name='nome'
                    defaultValue=''
                    rules={{
                       
                    }}
                    render={
                        ({ field: { onChange, onBlur, value }}) => (
                            <input type='text' id='nome' placeholder='Digita aqui' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )
                    }
                />

                { errors.nome && <div className='text-danger'> {errors.nome.message} </div> }    
            </div>

            <div className='col-md-4'>
                <label>E-mail:</label>
                <Controller control={control} name='email' defaultValue='' rules={{ }}
                    render={
                        ({ field: { onChange, onBlur, value }}) => (
                            <input type='email' placeholder='Digita aqui' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )
                    }
                />

                { errors.email && <div className='text-danger'> {errors.email.message} </div> }  
            </div>

        </div>

        <div className='row mb-3'>
            <div className='col-md-6'>
                <label>Senha:</label>
                <Controller control={control} name='senha' defaultValue='' rules={{  }}
                    render={
                        ({ field: { onChange, onBlur, value }}) => (
                            <input type='password' id='senha' placeholder='Digita aqui' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )
                    }
                />

                { errors.senha && <div className='text-danger'> {errors.senha.message} </div> }  

            </div>
            <div className='col-md-6'>
                <label>Confirmação Senha:</label>
                <Controller control={control} name='senhaconfirmacao' defaultValue='' rules={{ }}
                    render={
                        ({ field: { onChange, onBlur, value }}) => (
                            <input type='password' id='senhaconfirmacao' placeholder='Digita aqui' className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
                        )
                    }
                />

                { errors.senhaconfirmacao && <div className='text-danger'> {errors.senhaconfirmacao.message} </div> }  
                
            </div>
        </div>    

            <div className='row mb-3'>
                <div className='col-md-12'>
                    <input type='submit' value='Realizar Cadastro' className='btn btn-success' />
                </div>
            </div>
        </form>
    )
}