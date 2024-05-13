import { Loader2Icon } from "lucide-react";
import { PokeCard } from "./components/PokeCard/PokeCard";
import { usePokeList } from "./hooks/usePokeList/usePokeList";
import { Container } from "./styles/styles";
import pikachu from '/images/pikachu.svg'
import { Linkedin, Github } from 'lucide-react'

export function App() {
  const { PokeList, isLoading, handleOffsetValue } = usePokeList()

  const handleScrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      <Container>
        {PokeList.map(pokemon => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
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