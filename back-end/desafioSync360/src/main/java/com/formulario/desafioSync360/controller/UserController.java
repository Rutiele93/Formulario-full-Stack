package com.formulario.desafioSync360.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.formulario.desafioSync360.model.Resposta;
import com.formulario.desafioSync360.model.User;
import com.formulario.desafioSync360.repository.UserRepository;
import com.formulario.desafioSync360.service.UserService;
import com.formulario.desafioSync360.util.UploadUtil;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userServices;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarUsuario(
            @RequestParam("imagem") MultipartFile imagem,
            @RequestParam("nome") String nome,
            @RequestParam("idade") int idade,
            @RequestParam("rua") String rua,
            @RequestParam("bairro") String bairro,
            @RequestParam("estado") String estado,
            @RequestParam("biografia") String biografia) {

        try {
            String nomeImagem = UploadUtil.salvarImagem(imagem);
            User user = new User(nome, idade, rua, bairro, estado, biografia, nomeImagem);
            return userService.cadastrarAlterar(user, "cadastrar");
        } catch (Exception e) {
            Resposta resposta = new Resposta();
            resposta.setMensagem("Erro ao processar a requisição: " + e.getMessage());
            return new ResponseEntity<>(resposta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/editar/{id}")
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable Integer id) {
        try {
            // Verifica se o usuário existe no banco de dados
            Optional<User> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                // Se o usuário não existir, retorna um erro 404 (Not Found)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Obtém o usuário do Optional e retorna
            User user = optionalUser.get();
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            Resposta resposta = new Resposta();
            resposta.setMensagem("Erro ao processar a requisição: " + e.getMessage());
            return new ResponseEntity<>(resposta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para editar um usuário existente
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarUsuario(
            @PathVariable Integer id,
            @RequestParam("imagem") MultipartFile imagem,
            @RequestParam("nome") String nome,
            @RequestParam("idade") int idade,
            @RequestParam("rua") String rua,
            @RequestParam("bairro") String bairro,
            @RequestParam("estado") String estado,
            @RequestParam("biografia") String biografia) {

        try {
            // Verifica se o usuário existe no banco de dados
            Optional<User> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                // Se o usuário não existir, retorna um erro 404 (Not Found)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Obtém o usuário do Optional
            User user = optionalUser.get();

            // Atualiza os atributos do usuário com os novos valores
            user.setNome(nome);
            user.setIdade(idade);
            user.setRua(rua);
            user.setBairro(bairro);
            user.setEstado(estado);
            user.setBiografia(biografia);

            // Verifica se foi enviada uma nova imagem
            if (!imagem.isEmpty()) {
                String nomeImagem = UploadUtil.salvarImagem(imagem);
                user.setImagem(nomeImagem);
            }

            // Salva as alterações no banco de dados
            return userService.cadastrarAlterar(user, "editar");
        } catch (Exception e) {
            Resposta resposta = new Resposta();
            resposta.setMensagem("Erro ao processar a requisição: " + e.getMessage());
            return new ResponseEntity<>(resposta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // LISTAR todos os usuários
    @GetMapping("/listar")
    public Iterable<User> listar() {
        return userServices.listar();
    }

    // Endpoint para deletar um usuário existente
    @DeleteMapping("/remover/{id}")
    public ResponseEntity<Resposta> remover(@PathVariable Integer id) {
        return userServices.remover(id);
    }
}
