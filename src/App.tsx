import { Loader2Icon } from "lucide-react";
import { PokeCard } from "./components/PokeCard";
import { usePokeList } from "./hooks/usePokeList/usePokeList";
import { Container } from "./styles/styles";

export function App() {
  const { PokeList, isLoading, handleOffsetValue } = usePokeList()

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
      {isLoading ? '' : <button onClick={handleOffsetValue}>
        Carregar mais pokemons
      </button>}
    </>
  )
}