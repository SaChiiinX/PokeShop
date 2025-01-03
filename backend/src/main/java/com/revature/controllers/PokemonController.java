package com.revature.controllers;

import com.revature.exceptions.pokemon.InvalidPokemonException;
import com.revature.exceptions.pokemon.PokemonIdExistsException;
import com.revature.exceptions.pokemon.PokemonNameExistException;
import com.revature.exceptions.pokemon.PokemonNotFoundException;
import com.revature.models.Pokemon;
import com.revature.services.PokemonService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/pokemons")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class PokemonController {
    private final PokemonService pokemonService;

    @Autowired
    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public ResponseEntity<List<Pokemon>> getAllPokemons(HttpSession session) {
        List<Pokemon> pokemons = pokemonService.getAllPokemons();
        return ResponseEntity.ok(pokemons);
    }

    @GetMapping("/{pokemonId}")
    public ResponseEntity<Pokemon> getPokemonById(HttpSession session, @PathVariable int pokemonId) throws PokemonNotFoundException {
        Pokemon pokemon = pokemonService.getPokemonById(pokemonId);
        return ResponseEntity.ok(pokemon);
    }

    @DeleteMapping("/{pokemonId}")
    public ResponseEntity<Void> deletePokemonById(HttpSession session, @PathVariable int pokemonId) {
        pokemonService.deletePokemon(pokemonId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Pokemon> addNewPokemon(HttpSession session, @RequestBody Pokemon pokemon) throws PokemonNameExistException, PokemonIdExistsException, InvalidPokemonException {
        Pokemon returnedPokemon = pokemonService.addPokemon(pokemon);
        return ResponseEntity.status(HttpStatus.CREATED).body(returnedPokemon);
    }

    @PutMapping("/{pokemonId}")
    public ResponseEntity<Pokemon> editPokemon(HttpSession session, @PathVariable int pokemonId, @RequestBody Pokemon pokemon) throws PokemonNotFoundException, InvalidPokemonException {
        if (pokemon.getPokemonId() != pokemonId) {
            return ResponseEntity.badRequest().build();
        }
        Pokemon returnedPokemon = pokemonService.editPokemon(pokemon);
        return ResponseEntity.ok(returnedPokemon);
    }
}
