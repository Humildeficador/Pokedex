import { extractColors } from 'extract-colors';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface PokeListProps {
    name: string
    url: string
}

interface ApiPokeListResponseProps {
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

interface ApiPokeListDetailsResponseProps {
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

interface PokeListContextProps {
    children: ReactNode,
}

interface PokeListContextData {
    PokeList: PokeListDetailsProps[]
    isLoading: boolean
    handleOffsetValue: () => void
}

const PokeListContext = createContext<PokeListContextData>({} as PokeListContextData)

export function PokeListProvider({ children }: PokeListContextProps) {
    const [pokeListDetails, setPokeListDetails] = useState<PokeListDetailsProps[]>([])
    const [offset, setOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(false) //State para feedback de 'loading'
    const [hasFetchedInitialData, setHasFetchedInitialData] = useState<boolean>(false); //State para controlar dados iniciais


    function handleOffsetValue() {
        setOffset(prevState => prevState + 20);
    }

    useEffect(() => {
        //Para cada pokemon na lista, pega seus detalhes pela prop url
        async function fetchPokemonList(): Promise<void> {
            setIsLoading(true)
            try {
                const { data: { results } } = await api.get<ApiPokeListResponseProps>(`/api/v2/pokemon?offset=${offset}&limit=20`)
                const newList = await Promise.all(results.map(async pokemon => {
                    const { data } = await api.get<ApiPokeListDetailsResponseProps>(pokemon.url)
                    const sprite = data.sprites.other.dream_world.front_default
                    const extractedColors = await extractColors(sprite, { crossOrigin: 'anonymous', distance: 1, pixels: 40000 })
                    return {
                        id: data.id,
                        name: data.name,
                        sprite,
                        types: data.types.map(type => type.type.name),
                        hp: data.stats[0].base_stat,
                        height: data.height / 10,
                        weight: data.weight / 10,
                        color: extractedColors[0].hex
                    }
                }))

                if (hasFetchedInitialData) {
                    setPokeListDetails((prevState) => {
                        return [...prevState, ...newList]
                    })
                } else {
                    setPokeListDetails(newList)
                    setHasFetchedInitialData(true)
                }
            } catch (error) {
                console.error('Erro ao obter a lista de pokemons', error);
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchPokemonList();
    }, [offset])

    return (
        <PokeListContext.Provider value={{
            PokeList: pokeListDetails,
            isLoading,
            handleOffsetValue
        }}>
            {children}
        </PokeListContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePokeList() {
    const context = useContext(PokeListContext)
    return context
}