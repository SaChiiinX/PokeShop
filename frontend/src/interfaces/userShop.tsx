import { Pokemon } from "./pokemon";
import { User } from "./user";

export interface userShop{
    userShopId: number,
    user: User,
    shopItems: Pokemon[]
}