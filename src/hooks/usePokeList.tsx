import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface PokeListProps {
    name: string
    url: string
}

interface ApiPokeListResponseProps {
    results: PokeListProps[]
}

interface PokeListDetailsProps {
    id: number
    name: string
    sprite: string
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
}

interface PokeListContextProps {
    children: ReactNode,
}

interface PokeListContextData {
    PokeList: PokeListDetailsProps[]
    isLoading: boolean
}

const PokeListContext = createContext<PokeListContextData>({} as PokeListContextData)

export function PokeListProvider({ children }: PokeListContextProps) {
    const [pokeListDetails, setPokeListDetails] = useState<PokeListDetailsProps[]>([])
    //State para feedback de 'loading'
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        //Pega lista com name, url dos pokemons
        async function fetchPokemonList(callback: (pokeList: PokeListProps[]) => void): Promise<void> {
            try {
                const { data: { results } } = await api.get<ApiPokeListResponseProps>('/api/v2/pokemon')
                callback(results)
            } catch (error) {
                console.error('Erro ao obter a lista de pokemons', error);
            }
        }

        //Para cada pokemon na lista, pega seus detalhes pela prop url
        async function fetchPokemonDetails(pokeList: PokeListProps[]): Promise<void> {
            setIsLoading(true)
            try {
                const promises = pokeList.map(async pokemon => {
                    const { data } = await api.get<ApiPokeListDetailsResponseProps>(pokemon.url)
                    return {
                        id: data.id,
                        name: data.name,
                        sprite: data.sprites.other.dream_world.front_default
                    }
                })

                setPokeListDetails(await Promise.all(promises))
            } catch (error) {
                console.error('Erro ao obter a lista de pokemons', error);
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchPokemonList(fetchPokemonDetails);
    }, [])

    return (
        <PokeListContext.Provider value={{
            PokeList: pokeListDetails,
            isLoading
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