import { getTypeInfo, getTypeInfoProps } from '../../utils/getTypeInfo'
import { AbilityProps, PokeListDetailsProps } from '../../utils/interfaces'
import { AbilityContainer, AbilityContent, Card, Description, TypeContainer, TypeContent } from './styles'

interface PokeCardProps {
  pokemon: PokeListDetailsProps
  handleIsOpen: () => void
  setModalPokemon: (pokemon: PokeListDetailsProps) => void
}

export function PokeCard({ pokemon, handleIsOpen, setModalPokemon }: PokeCardProps) {

  const pokeTypes = getTypeInfo(pokemon.types)

  function handleModal() {
    handleIsOpen()
    setModalPokemon(pokemon)
  }

  return (
    <Card
      $color={pokemon.color}
      $typeColor={pokeTypes[0].color}
      onClick={handleModal}
    >
      <div className="title">
        <span className='name'>{pokemon.name}</span>
        <div className='hp'>
          <span>
            <span>ps</span>
            {pokemon.stats.hp}
          </span>
          <img
            src={pokeTypes[0].img}
            alt={pokeTypes[0].name}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className='imagem'>
        <img src={pokemon.sprites.frontDefault} alt={pokemon.name} width={200} height={200} />
        <div className='description'>
          <span className='id'>Nº{pokemon.id.toString().padStart(3, '0')}</span>
          <span className='height'>Altura: {pokemon.height.toFixed(1)}m</span>
          <span className='weight'>Peso: {pokemon.weight}kg</span>
        </div>
      </div>
      <TypeCard pokeTypes={pokeTypes} name={pokemon.name} abilities={pokemon.abilities} />
    </Card>
  )
}

interface TypeCardProps {
  name: string
  abilities: AbilityProps[]
  pokeTypes: getTypeInfoProps[]
}

function TypeCard({ name, abilities, pokeTypes }: TypeCardProps) {
  return (
    <Description>
      <TypeContainer>
        {pokeTypes.map(type => (
          <TypeContent
            $color={type.color}
            key={`${name}Type${type.name}`}>
            <img
              src={type.img}
              alt={type.name}
              width={20}
              height={20}
            />
            <span>{type.name}</span>
          </TypeContent>
        ))}
      </TypeContainer>
      <AbilityContainer>
        {abilities.map(ability => (
          <AbilityContent key={name + ability.name}>
            <span>
              {ability.name}
            </span>
            <p>{ability.text}</p>
          </AbilityContent>
        ))}
      </AbilityContainer>
    </Description>
  )
}