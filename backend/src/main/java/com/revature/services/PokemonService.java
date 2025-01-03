package com.revature.services;

import com.revature.daos.PokemonDAO;
import com.revature.exceptions.pokemon.InvalidPokemonException;
import com.revature.exceptions.pokemon.PokemonIdExistsException;
import com.revature.exceptions.pokemon.PokemonNameExistException;
import com.revature.exceptions.pokemon.PokemonNotFoundException;
import com.revature.models.Pokemon;
import com.revature.models.PokemonType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PokemonService {
    private final PokemonDAO pokemonDAO;

    @Autowired
    public PokemonService(PokemonDAO pokemonDAO){
        this.pokemonDAO = pokemonDAO;
    }

    public Pokemon addPokemon(Pokemon pokemon) throws PokemonIdExistsException, PokemonNameExistException, InvalidPokemonException {
        if(pokemon == null){
            throw new InvalidPokemonException();
        }

        if(pokemonDAO.findById(pokemon.getPokemonId()).isPresent()){
            throw new PokemonIdExistsException();
        }

        if(pokemonDAO.findByName(pokemon.getName()).isPresent()){
            throw new PokemonNameExistException();
        }
        return pokemonDAO.save(pokemon);
    }

    public Pokemon editPokemon(Pokemon pokemon) throws InvalidPokemonException, PokemonNotFoundException {
        if(pokemon == null){
            throw new InvalidPokemonException();
        }

        if(pokemonDAO.findById(pokemon.getPokemonId()).isEmpty()){
            throw new PokemonNotFoundException();
        }
        return pokemonDAO.save(pokemon);
    }

    public void deletePokemon(int id){
        pokemonDAO.deleteById(id);
    }

    public Pokemon getPokemonById(int id) throws PokemonNotFoundException {
        Optional<Pokemon> optionalPokemon = pokemonDAO.findById(id);
        if(optionalPokemon.isEmpty()){
            throw new PokemonNotFoundException();
        }
        return optionalPokemon.get();
    }

    public Pokemon getPokemonByName(String name) throws PokemonNotFoundException {
        Optional<Pokemon> optionalPokemon = pokemonDAO.findByName(name);
        if(optionalPokemon.isEmpty()){
            throw new PokemonNotFoundException();
        }
        return optionalPokemon.get();
    }

    public List<Pokemon> getAllPokemons() {
        return pokemonDAO.findAll();
    }

    public Set<Pokemon> getFiveRandom(){
        return pokemonDAO.findFiveRandom();
    }

    public Set<Pokemon> getPokemonByTypes(List<PokemonType> types){
        Set<Pokemon> set = new HashSet<>();

        for(PokemonType type : types){
            set.addAll(pokemonDAO.findByType(type));
        }
        return set;
    }
}
