import React, { useState, useEffect } from 'react';
import './App.css';
import Tabela from './pages/Tabela';
import UserForm from './pages/UserForm'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os usuários
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/listar');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUserData(data); // Atualiza o estado com os dados dos usuários
        setLoading(false); // Marca o carregamento como concluído
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers(); // Chama a função de busca de usuários ao montar o componente
  }, []); // O segundo argumento vazio [] garante que o efeito só seja executado uma vez

  return (
    <div className='corpo'>      
      <UserForm /> 
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Tabela userData={userData} />
       
      )}
      
    </div>
  );
}

export default App;
