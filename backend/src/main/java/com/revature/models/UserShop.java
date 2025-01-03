package com.revature.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "user_shops")
public class UserShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userShopId;
    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "user_shop_pokemon",
            joinColumns = @JoinColumn(name = "userShopId"),
            inverseJoinColumns = @JoinColumn(name = "pokemon_id")
    )
    private Set<Pokemon> pokemons;
}
