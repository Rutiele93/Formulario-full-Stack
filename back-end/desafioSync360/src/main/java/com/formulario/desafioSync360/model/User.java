package com.formulario.desafioSync360.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor // Adiciona um construtor com todos os argumentos
@NoArgsConstructor // Adiciona o construtor padrão
@Getter
@Setter
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private Integer idade;
    private String imagem;
    private String biografia;
    private String rua;
    private String bairro;
    private String estado;

    public User(String nome, Integer idade, String rua, String bairro, String estado, String biografia, String imagem) {
        this.nome = nome;
        this.idade = idade;
        this.rua = rua;
        this.bairro = bairro;
        this.estado = estado;
        this.biografia = biografia;
        this.imagem = imagem;
    }
}
