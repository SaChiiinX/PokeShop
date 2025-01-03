export interface User{
    userId: number | null;
    username: string;
    password?: string;
    role: string;
    lastLogin?: Date | null;
    coins: number;
}