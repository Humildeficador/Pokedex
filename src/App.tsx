import { Github, Linkedin, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { PokeCard } from './components/PokeCard/PokeCard'
import { PokeCardModal } from './components/PokeCardModal/PokeCardModal'
import { usePokeList } from './hooks/usePokeList/usePokeList'
import { Container } from './styles/styles'
import { PokeListDetailsProps } from './utils/interfaces'
import pikachu from '/images/pikachu.svg'

export function App() {
  const { PokeList, isLoading, handleOffsetValue } = usePokeList()
  const [modalPokemon, setModalPokemon] = useState<PokeListDetailsProps>()

  const handleScrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const [isOpen, setIsOpen] = useState(false)
  function handleIsOpen() {
    setIsOpen(true)
  }
  function handleGetPokemon(pokemon: PokeListDetailsProps) {
    setModalPokemon(pokemon)
  }
  function onRequestClose() {
    setIsOpen(false)
  }

  return (
    <>
      <PokeCardModal
        isOpen={isOpen}
        onRequestClose={onRequestClose} 
        pokemon={modalPokemon}
      />
      <Container>
        {PokeList.map(pokemon => (
          <PokeCard
            key={pokemon.id}
            pokemon={pokemon} 
            handleIsOpen={handleIsOpen}
            setModalPokemon={handleGetPokemon}
          />
        ))
        }
      </Container>
      {isLoading &&
        <div className="loadingIcon">
          <Loader2Icon size={200} color="#FFFFFF" />
        </div>
      }
      {isLoading
        ? ''
        : <div className="loadingButton">
          <div className="social">
            <a href="https://www.linkedin.com/in/jvictorlndr/" target="_blank">
              <Linkedin size={35} strokeWidth={1.3} />
            </a>
            <a href="https://github.com/Humildeficador" target="_blank">
              <Github size={35} strokeWidth={1.3} />
            </a>
          </div>
          <button onClick={handleOffsetValue}>
            Carregar mais pokemons
          </button>
          <img src={pikachu} alt="Pikachu" onClick={handleScrolltoTop} />
        </div>
      }
    </>
  )
}