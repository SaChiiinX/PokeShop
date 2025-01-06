package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="pokemons")
public class Pokemon{
    @Id
    private int pokemonId;

    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private PokemonType type1;

    @Enumerated(EnumType.STRING)
    private PokemonType type2;

    private String imgUrl;
    private int cost;

    @ManyToMany(mappedBy = "pokemons", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private Set<UserShop> userShops;

    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private Set<UserPokemon> userPokemons;
}