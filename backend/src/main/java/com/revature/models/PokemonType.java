package com.revature.models;

public enum PokemonType {
    NORMAL,
    FIRE,
    WATER,
    ELECTRIC,
    GRASS,
    ICE,
    FIGHTING,
    POISON,
    GROUND,
    FLYING,
    PSYCHIC,
    BUG,
    ROCK,
    GHOST,
    DRAGON,
    DARK,
    STEEL,
    FAIRY,
    STELLAR;

    public static PokemonType fromString(String type) {
        return PokemonType.valueOf(type.toUpperCase());  // Assuming correct type, convert to uppercase
    }
}
