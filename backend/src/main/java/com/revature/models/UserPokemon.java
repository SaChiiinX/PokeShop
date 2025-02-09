package com.revature.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "user_pokemons")
public class UserPokemon{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userPokemonId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pokemon_id")
    private Pokemon pokemon;
}