package com.revature.daos;

import com.revature.models.Pokemon;
import com.revature.models.PokemonType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PokemonDAO extends JpaRepository<Pokemon, Integer> {

    Optional<Pokemon> findByName(String name);

    @Query(value = "select * from pokemons order by rand() limit 5", nativeQuery = true)
    Set<Pokemon> findFiveRandom();

    @Query("from Pokemon p where p.type1 = :type or p.type2 = :type")
    Set<Pokemon> findByType(@Param("type") PokemonType type);
}
