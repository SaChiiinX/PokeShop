export interface PokemonProps{
    id: number,
    name: string,
    type1: string,
    type2: string,
    imgUrl: string,
    cost: number,
    variant?: "management" | "shop" | "collection",

    owned?: boolean
}