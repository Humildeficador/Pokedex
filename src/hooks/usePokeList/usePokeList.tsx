import { extractColors } from 'extract-colors'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { api } from '../../services/api'
import { capitalize } from '../../utils/capitalize'
import { APIAbilitiesProps, AbilitiesProps, AbilityProps, ApiPokeListDetailsResponseProps, ApiPokeListResponseProps, NamedAPIResource, PokeListContextData, PokeListContextProps, PokeListDetailsProps } from '../../utils/interfaces'

const LOCALSTORAGE_KEY = '@Humildas_Pokedex'

const PokeListContext = createContext<PokeListContextData>({} as PokeListContextData)

export function PokeListProvider({ children }: PokeListContextProps) {
	const [pokeList, setPokeList] = useState<NamedAPIResource[]>([])
	const [pokeListDetails, setPokeListDetails] = useState<PokeListDetailsProps[]>([])
	const [offset, setOffset] = useState(0)
	const isFirstRunning = useRef(true) // State para controle de Effect
	const [isLoading, setIsLoading] = useState(true) //State para feedback de 'loading'

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			const localPokeList = localStorage.getItem(LOCALSTORAGE_KEY)
			if (!localPokeList) {
				const { data: { results } } = await api.get<ApiPokeListResponseProps>('api/v2/pokemon?limit=1500')
				localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(results))
				setPokeList(results)
				return
			}
			setPokeList(JSON.parse(localPokeList))
			return
		})()
	}, [])

	useEffect(() => {
		//Para cada pokemon na lista, pega seus detalhes pela prop url
		if (isFirstRunning.current) {
			isFirstRunning.current = false
			return
		}

		async function fetchPokemonList(): Promise<void> {
			setIsLoading(true)
			try {
				const listSliced = pokeList.slice(offset, offset + 21)
				const newList = await Promise.all(listSliced.map(async pokemon => {
					const { data } = await api.get<ApiPokeListDetailsResponseProps>(pokemon.url)
					const abilities = await fetchPokemonAbilities(data.abilities)
					const official_artwork = data.sprites.other['official-artwork']
					const extractedColors = await extractColors(official_artwork.front_default, { crossOrigin: 'anonymous', distance: 1, pixels: 40000 })
					return {
						id: data.id,
						name: capitalize(data.name.replace(/-/g, ' ')),
						sprites: {
							frontDefault: official_artwork.front_default,
							frontShiny: official_artwork.front_shiny
						},
						abilities,
						types: data.types.map(type => type.type.name),
						stats: {
							hp: data.stats[0].base_stat,
							atack: data.stats[1].base_stat,
							defense: data.stats[2].base_stat,
							specialAtack: data.stats[3].base_stat,
							specialDefense: data.stats[4].base_stat,
							speed: data.stats[5].base_stat
						},
						height: data.height / 10,
						weight: data.weight / 10,
						color: extractedColors[0].hex
					}
				}))

				setPokeListDetails((prevState) => {
					return [...prevState, ...newList]
				})

			} catch (error) {
				console.error('Erro ao obter a lista de pokemons', error)
			}
			finally {
				setIsLoading(false)
			}
		}
		fetchPokemonList()
	}, [offset, pokeList])

	function handleOffsetValue() {
		setOffset(prevState => prevState + 20)
	}

	return (
		<PokeListContext.Provider value={{
			PokeList: pokeListDetails,
			isLoading,
			handleOffsetValue
		}}>
			{children}
		</PokeListContext.Provider>
	)
}

async function fetchPokemonAbilities(abilitiesList: AbilitiesProps[]): Promise<AbilityProps[]> {
	const pokeAbilities = abilitiesList.slice(0, 2)

	return Promise.all(pokeAbilities.map(async ({ ability }) => {
		const { data } = await api.get<APIAbilitiesProps>(ability.url)

		const text = data.flavor_text_entries.find(text_entries => text_entries.language.name === 'en')

		return {
			name: capitalize(ability.name.replace(/-/g, ' ')),
			text: text?.flavor_text || 'I\'m sorry, we have no information about this ability',
		}
	}))
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePokeList() {
	const context = useContext(PokeListContext)
	return context
}