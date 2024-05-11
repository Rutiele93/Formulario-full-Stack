package com.formulario.desafioSync360.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.formulario.desafioSync360.model.Resposta;
import com.formulario.desafioSync360.model.User;
import com.formulario.desafioSync360.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Resposta resposta;

    // Método para criar/alterar usuário
    public ResponseEntity<?> cadastrarAlterar(User user, String acao) {
        if (user.getNome().equals("")) {
            resposta.setMensagem("O Nome do Usuário é Obrigatório!");
            return new ResponseEntity<Resposta>(resposta, HttpStatus.BAD_REQUEST);
        } else if (user.getImagem().equals("")) {
            resposta.setMensagem("A imagem do Usuário é Obrigatório!");
            return new ResponseEntity<Resposta>(resposta, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
            }
        }
    }

    // Método para listar todos os usuários
    public Iterable<User> listar() {
        return userRepository.findAll();

    }

    // Método para deletar um usuário existente
    public ResponseEntity<Resposta> remover(Integer id) {
        userRepository.deleteById(id);
        resposta.setMensagem("Usuário foi removido com sucesso!");
        return new ResponseEntity<Resposta>(resposta, HttpStatus.OK);
    }

}