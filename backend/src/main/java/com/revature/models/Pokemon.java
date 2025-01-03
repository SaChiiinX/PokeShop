package com.revature.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}