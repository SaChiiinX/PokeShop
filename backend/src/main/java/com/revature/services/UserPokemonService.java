package com.revature.services;

import com.revature.daos.UserPokemonDAO;
import com.revature.exceptions.pokemon.PokemonNotFoundException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.Pokemon;
import com.revature.models.PokemonType;
import com.revature.models.User;
import com.revature.models.UserPokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserPokemonService {
    private final UserPokemonDAO userPokemonDAO;
    private final UserService userService;
    private final PokemonService pokemonService;

    @Autowired
    public UserPokemonService(UserPokemonDAO userPokemonDAO, UserService userService, PokemonService pokemonService) {
        this.userPokemonDAO = userPokemonDAO;
        this.userService = userService;
        this.pokemonService = pokemonService;
    }

    public UserPokemon addUserPokemon(int userId, int pokemonId) throws UserNotFoundException, PokemonNotFoundException {
        User user = userService.getUserById(userId);
        Pokemon pokemon = pokemonService.getPokemonById(pokemonId);

        UserPokemon userPokemon = new UserPokemon();
        userPokemon.setUser(user);
        userPokemon.setPokemon(pokemon);
        return userPokemonDAO.save(userPokemon);
    }

    public Set<Pokemon> getFilterPokemons(int userId, String pokemonName, List<PokemonType> types, int status) throws PokemonNotFoundException {
        Set<Pokemon> set = new HashSet<>();

        if(!pokemonName.isEmpty()){
            set.add(pokemonService.getPokemonByName(pokemonName));
            return set;
        }

        if (status == 2) {
            set.addAll(userPokemonDAO.findAcquired(userId));
            set.addAll(userPokemonDAO.findUnacquired(userId));
        } else if (status == 0) {
            set.addAll(userPokemonDAO.findAcquired(userId));
        } else if (status == 1) {
            set.addAll(userPokemonDAO.findUnacquired(userId));
        }

        if(!types.isEmpty()){
            set.retainAll(pokemonService.getPokemonByTypes(types));
        }
        return set;
    }

}
