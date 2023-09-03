import React, { useState, useEffect } from 'react';
import * as blobServices from '../../services/blob-services';
import InserirImagemForm from '../forms/InserirImagemForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DetalharNoticia from '../forms/DetalharNoticia';
import moment from 'moment';


export default function Inicio() {
  const [imagens, setImagens] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [idNoticia, setIdNoticia] = useState('');
  const [tituloNoticia, setTituloNoticia] = useState('');
  const detalharNoticia = (id) => { setIdNoticia(id); }

  const listarImagens = () => {
    blobServices.getBlobs()
      .then(result => setImagens(result))
      .catch(e => console.log(e.response));
  }

  useEffect(() => {
    listarImagens();
  }, []);

  const toggleForm = () => {
    setMostrarForm(!mostrarForm);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY');
  };

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Projeto Tech Challenge - Módulo 2 -  <button className='btn btn-primary' onClick={toggleForm}>{mostrarForm ? 'Esconder Formulário' : 'Cadastrar Noticia'}
          </button></h1>
          {mostrarForm && (
            <div className='row' style={{ marginTop: '20px' }}>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Cadastro de Notícias</h5>
                    <InserirImagemForm />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='row'>
            {imagens.map((imagem, i) => (
              <div className='card col-md-3' style={{ marginTop: '20px', minHeight: '250px' }} key={i}>
                <div className='card-body'>
                  <h1 className='card-title' style={{ fontWeight: 'bold' }}> {imagem.titulo}</h1>
                  <h2 className='card-text'>
                    {imagem.descricao}
                  </h2>
                  {imagem.imagem && <img src={imagem.imagem} style={{ width: '200px' }} alt="Imagem" />}
                  <h5 className='card-text'>
                    {imagem.chapeu}
                  </h5>
                  <p className='card-text'> Publicado em:
                    {formatDate(imagem.dataPublicacao)}
                  </p>
                  <p className='card-text' style={{ fontWeight: 'bold' }}> Por:
                    {imagem.autor}
                  </p>
                  <button type="button" className="btn btn-primary" onClick={() => { setLgShow(true); setTituloNoticia(imagem.titulo); detalharNoticia(imagem.id) }}><i style={{ width: '15px' }} className="fas fa-info-circle" />  Detalhar </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='bg-info' closeButton>
          <Modal.Title >
            <i className="fas fa-info-circle" /> Noticia - {tituloNoticia}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetalharNoticia detalharNoticia={idNoticia} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLgShow(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  );
}

