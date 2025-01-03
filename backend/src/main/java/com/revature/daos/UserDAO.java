package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserDAO extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    @Query("from User where username = :username and password = :password")
    Optional<User> findByCredentials(@Param("username") String username, @Param("password") String password);
}

