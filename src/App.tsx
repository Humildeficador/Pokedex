import { LoaderIcon } from "lucide-react";
import { usePokeList } from "./hooks/usePokeList";
import { PokeCard } from "./components/PokeCard";
import { Container } from "./styles/styles";

export function App() {
  const { PokeList, isLoading } = usePokeList()
  return (
    <Container>
      {isLoading ? <LoaderIcon className="loadingIcon" size={100} />
        : PokeList.map(pokemon => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))
      }
    </Container>
  )
}