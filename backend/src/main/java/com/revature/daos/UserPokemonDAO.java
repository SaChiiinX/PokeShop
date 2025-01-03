package com.revature.daos;

import com.revature.models.Pokemon;
import com.revature.models.UserPokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserPokemonDAO extends JpaRepository<UserPokemon, Integer> {
    @Query("from Pokemon p join UserPokemon up on up.pokemon.id = p.id where up.user.id = :userId and p.name = :name")
    Optional<Pokemon> findPokemonByName(@Param("userId") int userId, @Param("name") String name);

    @Query("from Pokemon p where p.id in (select up.pokemon.id from UserPokemon up where up.user.id = :userId)")
    Set<Pokemon> findAcquired(@Param("userId") int userId);

    @Query("from Pokemon p where p.id not in (select up.pokemon.id from UserPokemon up where up.user.id = :userId)")
    Set<Pokemon> findUnacquired(@Param("userId") int userId);
}