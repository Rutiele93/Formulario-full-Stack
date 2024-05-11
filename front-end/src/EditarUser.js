import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarUser = ({ userId }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    rua: '',
    bairro: '',
    estado: '',
    biografia: '',
    imagem: null
  });

  useEffect(() => {
    // Função para buscar os dados do usuário com o ID especificado
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/editar/${userId}`);
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUserData(); // Chama a função ao montar o componente

    // Cleanup da função useEffect
    return () => {
      // Qualquer cleanup necessário
    };
  }, [userId]); // Executa o useEffect toda vez que userId mudar

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
    userData.append('imagem', imagem); // Certifique-se de que `imagem` é um arquivo selecionado pelo usuário
  
    try {
      const response = await axios.put(`http://localhost:8081/editar/${userId}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Atualizar a interface com as informações do usuário editado
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };
  
  return (
    <div>
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} required />
        <input type="text" name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required />
        <input type="text" name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required />
        <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
        <textarea name="biografia" placeholder="Biografia" value={formData.biografia} onChange={handleChange} required />
        <input type="file" name="imagem" onChange={handleImageChange} />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarUser;
