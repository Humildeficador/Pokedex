import { extractColors } from 'extract-colors';
import { createContext, useContext, useEffect, useState } from "react";

import { api } from "../../services/api";
import { capitalize } from '../../utils/capitalize';
import { APIAbilitiesProps, AbilitiesProps, AbilityProps, ApiPokeListDetailsResponseProps, ApiPokeListResponseProps, PokeListContextData, PokeListContextProps, PokeListDetailsProps } from './usePokeListInterfaces';

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
                    const abilities = await fetchPokemonAbilities(data.abilities)
                    const sprite = data.sprites.other.dream_world.front_default
                    const extractedColors = await extractColors(sprite, { crossOrigin: 'anonymous', distance: 1, pixels: 40000 })
                    return {
                        id: data.id,
                        name: capitalize(data.name),
                        sprite,
                        abilities,
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

        async function fetchPokemonAbilities(abilitiesList: AbilitiesProps[]): Promise<AbilityProps[]> {
            const pokeAbilities = abilitiesList.slice(0, 2)

            return Promise.all(pokeAbilities.map(async ({ ability }) => {
                const { data } = await api.get<APIAbilitiesProps>(ability.url)

                const text = data.flavor_text_entries.find(text_entries => text_entries.language.name === 'en')

                return {
                    name: capitalize(ability.name.replace('-', ' ')),
                    text: text?.flavor_text || `I'm sorry, we have no information about this ability`,
                }
            }))
        }

        fetchPokemonList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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