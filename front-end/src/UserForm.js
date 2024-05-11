import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    rua: '',
    bairro: '',
    estado: '',
    biografia: '',
    imagem: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagem: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, idade, rua, bairro, estado, biografia, imagem } = formData;
    const userData = new FormData();
    userData.append('nome', nome);
    userData.append('idade', idade);
    userData.append('rua', rua);
    userData.append('bairro', bairro);
    userData.append('estado', estado);
    userData.append('biografia', biografia);
    userData.append('imagem', imagem);

    try {
      const response = await axios.post('http://localhost:8081/cadastrar', userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Atualizar a interface com as informações do usuário cadastrado
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className='form contaner'>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-lg-4 col-md-6 form-group">
            <input type="text" className='form-control' name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div class="col-lg-4 col-md-6 form-group">
            <input type="number" className='form-control' name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} required />
          </div>
          <div class="col-lg-4 col-md-6 form-group">
            <input type="text" className='form-control' name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required />
          </div>
          <div class="col-lg-4 col-md-6 form-group">
            <input type="text" className='form-control' name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required />
          </div>
          <div class="col-lg-4 col-md-6 form-group">
            <input type="text" className='form-control' name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
          </div>
          <div class="col-lg-4 col-md-6 form-group">
            <input type="file" className='form-control' name="file" onChange={handleImageChange} required />
          </div>
          <div class="form-group mt-3">
            <textarea name="biografia" className='form-control' rows="5" placeholder="Biografia" value={formData.biografia} onChange={handleChange} required />
          </div>
          <div className='text-center'>
            <button type="submit">Cadastrar</button>
          </div>
        </div>
      </form>

    </div >
  );
};

export default UserForm;
