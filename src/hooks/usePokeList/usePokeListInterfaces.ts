import { ReactNode } from "react"

export interface PokeListProps {
    name: string
    url: string
}

export interface ApiPokeListResponseProps {
    results: PokeListProps[]
}

export interface PokeListDetailsProps {
    id: number
    name: string
    sprite: string
    types: string[]
    hp: number
    height: number
    weight: number
    color: string
}

export interface ApiPokeListDetailsResponseProps {
    id: number
    name: string
    sprites: {
        other: {
            dream_world: {
                front_default: string
            }
        }
    }
    height: number
    weight: number
    types: {
        type: {
            name: string
            url: string
        }
    }[]
    stats: {
        base_stat: number
    }[]
}

export interface PokeListContextProps {
    children: ReactNode,
}

export interface PokeListContextData {
    PokeList: PokeListDetailsProps[]
    isLoading: boolean
    handleOffsetValue: () => void
}