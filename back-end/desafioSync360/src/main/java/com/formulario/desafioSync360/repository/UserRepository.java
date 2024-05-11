package com.formulario.desafioSync360.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.formulario.desafioSync360.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

}
