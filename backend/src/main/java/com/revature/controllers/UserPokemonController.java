package com.revature.controllers;

import com.revature.exceptions.pokemon.PokemonNotFoundException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.Pokemon;
import com.revature.models.PokemonType;
import com.revature.models.UserPokemon;
import com.revature.services.UserPokemonService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users/pokemons")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class UserPokemonController {
    private final UserPokemonService userPokemonService;

    @Autowired
    public UserPokemonController(UserPokemonService userPokemonService) {
        this.userPokemonService = userPokemonService;
    }

    @PostMapping()
    public ResponseEntity<UserPokemon> addUserPokemon(HttpSession session, @RequestParam int pokemonId) throws UserNotFoundException, PokemonNotFoundException {
        if(session.isNew() || session.getAttribute("userId") == null){
            return ResponseEntity.badRequest().build();
        }

        UserPokemon userPokemon = userPokemonService.addUserPokemon((int)session.getAttribute("userId"), pokemonId);
        return ResponseEntity.ok(userPokemon);
    }

    @GetMapping()
    public ResponseEntity<List<Pokemon>> getPokemonsByFilters(HttpSession session,
                                                              @RequestParam(value = "name", required = false) String pokemonName,
                                                              @RequestParam(value = "types", required = false) List<PokemonType> types,
                                                              @RequestParam(value = "status", required = false) String status) throws PokemonNotFoundException {
        if(session.isNew() || session.getAttribute("username") == null){
            return ResponseEntity.badRequest().build();
        }

        pokemonName = pokemonName == null ? "" : pokemonName.toLowerCase();
        types = types == null ? Collections.emptyList() : types;
        int statusInt = mapStatusToInt(status);

        List<Pokemon> pokemons = new ArrayList<>(userPokemonService.
                getFilterPokemons((int)session.getAttribute("userId"), pokemonName, types, statusInt));
        pokemons.sort(Comparator.comparingInt(Pokemon::getPokemonId));
        return ResponseEntity.ok(pokemons);
    }

    private int mapStatusToInt(String status){
        if(status == null) { return 2;}
        return switch (status.toLowerCase()) {
            case "acquired" -> 0;
            case "unacquired" -> 1;
            default -> 2;
        };
    }
}
