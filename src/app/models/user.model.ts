export interface User {
    fullname: string
    password: string
    username: string
    coins: number
    moves: []
}

export interface Signup {
    fullname: string
    username: string
    password: string
}

export interface Login {
    username: string
    password: string
}

export interface Move {
    toId: string
    to: string
    at: number
    amount: number
}