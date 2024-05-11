import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalhesUsuario from './DetalhesUsuario';
import EditarUser from './EditarUser';
import 'bootstrap/dist/css/bootstrap.min.css';



const Tabela = () => {
  const [userData, setUserData] = useState([]); // Estado para armazenar os dados dos usuários
  const [editUserId, setEditUserId] = useState(null); // Estado para armazenar o ID do usuário selecionado para edição
  const [editUserDetails, setEditUserDetails] = useState(null); // Estado para armazenar os detalhes do usuário selecionado para edição
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para armazenar o ID do usuário selecionado para exclusão ou detalhamento
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Estado para controlar a exibição do modal de detalhes

  useEffect(() => {
    // Função para buscar os dados dos usuários
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/listar');
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUserData(); // Chama a função ao montar o componente
  }, []);

  // Função para lidar com o clique no botão de editar
  const handleEditClick = async (userId) => {
    setEditUserId(userId); // Define o ID do usuário para edição
    setShowDetailsModal(false); // Desativa o modal de detalhes
    try {
      const response = await axios.get(`http://localhost:8081/editar/${userId}`);
      setEditUserDetails(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
    }
  };

  // Função para lidar com o clique no botão de detalhar
  const handleDetailClick = (userId) => {
    setSelectedUserId(userId); // Define o ID do usuário para detalhamento
    setShowDetailsModal(true); // Ativa o modal de detalhes
    setEditUserId(null); // Desativa a edição do usuário
  };

  // Função para lidar com o clique no botão de excluir
  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/remover/${userId}`);
      // Atualizar a lista de usuários após a exclusão
      const updatedUsers = userData.filter(user => user.id !== userId);
      setUserData(updatedUsers);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  // Função para fechar o modal de detalhes
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedUserId(null); // Limpa o ID do usuário selecionado ao fechar o modal
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table>
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Estado</th>
            <th>Biografia</th>
            <th>Imagem</th>
            <th scope="col" className="text-center">Ações</th>
          </tr>
        </thead>
        {/* Corpo da tabela */}
        <tbody>
          {userData.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.idade}</td>
              <td>{usuario.rua}</td>
              <td>{usuario.bairro}</td>
              <td>{usuario.estado}</td>
              <td>{usuario.biografia}</td>
              <td><img src={"../img/" + usuario.imagem} alt={`Imagem de ${usuario.nome}`} width="100px" /></td>
              <td className="text-center">
                {/* Botões de ação */}
                <button className="btn btn-warning" onClick={() => handleEditClick(usuario.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(usuario.id)}>Excluir</button>
                <button className="btn btn-success" onClick={() => handleDetailClick(usuario.id)}>Detalhar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal de detalhes */}
      {showDetailsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {/* Conteúdo do modal */}
            <DetalhesUsuario userDetails={userData.find(user => user.id === selectedUserId)} />
          </div>
        </div>
      )}
      {/* Renderiza o componente EditarUser se editUserId não for null */}
      {editUserId && <EditarUser userId={editUserId} userDetails={editUserDetails} />}
    </div>
  );
};

export default Tabela;