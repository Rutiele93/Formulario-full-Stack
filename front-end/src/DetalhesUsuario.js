import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetalhesUsuario = ({ userDetails }) => {
  // Verifica se há detalhes do usuário disponíve
  console.log(userDetails);
  if (!userDetails) {
    return <div>Nenhum detalhe de usuário encontrado.</div>;
  }

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      <div>
        <p><strong>ID:</strong> {userDetails.id}</p>
        <p><strong>Nome:</strong> {userDetails.nome}</p>
        <p><strong>Idade:</strong> {userDetails.idade}</p>
        <p><strong>Rua:</strong> {userDetails.rua}</p>
        <p><strong>Bairro:</strong> {userDetails.bairro}</p>
        <p><strong>Estado:</strong> {userDetails.estado}</p>
        <p><strong>Biografia:</strong> {userDetails.biografia}</p>
        <p><strong>Imagem:</strong> <img src={`../img/${userDetails.imagem}`} alt={`Imagem de ${userDetails.nome}`} width="100px" /></p>
        {/* Adicione mais campos conforme necessário */}
      </div>
    </div>
  );
};

export default DetalhesUsuario;
