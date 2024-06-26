import { ReactNode } from 'react'

export interface NamedAPIResource {
    name: string
    url: string
}

export interface ApiPokeListResponseProps {
    results: NamedAPIResource[]
}

export interface PokeListDetailsProps {
    id: number
    name: string
    sprites: {
        frontDefault: string
        frontShiny: string
    }
    types: string[]
    stats: {
        hp: number
        atack: number
        defense: number
        specialAtack: number
        specialDefense: number
        speed: number
    }
    height: number
    weight: number
    color: string
    abilities: AbilityProps[]
}

export interface ApiPokeListDetailsResponseProps {
    id: number
    name: string
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
                front_shiny: string
            }
        }
    }
    height: number
    weight: number
    types: {
        type: NamedAPIResource
    }[]
    stats: {
        base_stat: number
    }[]
    abilities: AbilitiesProps[]
}

export interface AbilitiesProps {
    ability: NamedAPIResource
}

export interface APIAbilitiesProps {
    name: string
    effect_entries: {
        short_effect: string | null
    }[]
    flavor_text_entries: {
        flavor_text: string
        language: {
            name: string
        }
    }[]
}

export interface AbilityProps {
    name: string;
    text: string;
}

export interface PokeListContextProps {
    children: ReactNode,
}

export interface PokeListContextData {
    PokeList: PokeListDetailsProps[]
    isLoading: boolean
    handleOffsetValue: () => void
}