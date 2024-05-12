import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalhesUsuario from './DetalhesUsuario';
import EditarUser from './EditarUser';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tabela = () => {
  const [userData, setUserData] = useState([]); // Estado para armazenar os dados dos usuários
  const [editUserId, setEditUserId] = useState(null); // Estado para armazenar o ID do usuário selecionado para edição
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para armazenar o ID do usuário selecionado para exclusão ou detalhamento
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Estado para controlar a exibição do modal de detalhes
  const [editFormVisible, setEditFormVisible] = useState(false); // Estado para controlar a visibilidade do formulário de edição
  const [loading, setLoading] = useState(true); // Estado para controlar o estado de carregamento dos dados

  useEffect(() => {
    // Função para buscar os dados dos usuários
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/listar');
        setUserData(response.data);
        setLoading(false); // Define o estado de carregamento como false após obter os dados
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
    setEditFormVisible(true); // Ativa o formulário de edição
    setSelectedUserId(null); // Limpa o ID do usuário selecionado
  };

  // Função para lidar com o clique no botão de detalhar
  const handleDetailClick = (userId) => {
    setSelectedUserId(userId); // Define o ID do usuário para detalhamento
    setShowDetailsModal(true); // Ativa o modal de detalhes
    setEditFormVisible(false); // Desativa o formulário de edição
    setEditUserId(null); // Limpa o ID do usuário selecionado para edição
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola a página até o topo
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
    <div className='form container'>
      <p>Lista de Usuários</p>
      {loading ? (
        <div>Carregando...</div> // Adiciona uma mensagem de carregamento
      ) : (
        <table className='table'>
          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>Estado</th>
              <th>Biografia</th>
              <th scope="col" className="text-center">Ações</th>
            </tr>
          </thead>
          {/* Corpo da tabela */}
          <tbody>
            {userData.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td><img src={"../img/" + usuario.imagem} alt={`Imagem de ${usuario.nome}`} /></td>
                <td>{usuario.nome}</td>
                <td>{usuario.idade}</td>
                <td>{usuario.rua}</td>
                <td>{usuario.bairro}</td>
                <td>{usuario.estado}</td>
                <td>{usuario.biografia}</td>
                <td colSpan="3">
                  {/* Botões de ação */}
                  <button className="editar" onClick={() => handleEditClick(usuario.id)} disabled={editUserId !== null}>Editar</button>
                  <button className="deletar" onClick={() => handleDeleteClick(usuario.id)}>Excluir</button>
                  <button className="detalhar" onClick={() => handleDetailClick(usuario.id)} disabled={showDetailsModal}>Detalhar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal de detalhes */}
      {showDetailsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {/* Verifica se há um ID de usuário selecionado */}
            {selectedUserId !== null && (
              /* Busca os detalhes do usuário com o ID selecionado */
              <DetalhesUsuario userDetails={userData.find(user => user.id === selectedUserId)} />
            )}
          </div>
        </div>
      )}
      {/* Renderiza o componente EditarUser se editUserId não for null */}
      {editFormVisible && <EditarUser userId={editUserId} />}
    </div>
  );
};

export default Tabela;
