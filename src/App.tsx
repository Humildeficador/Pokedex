import { Loader2Icon } from "lucide-react";
import { usePokeList } from "./hooks/usePokeList";
import { PokeCard } from "./components/PokeCard";
import { Container } from "./styles/styles";

export function App() {
  const { PokeList, isLoading } = usePokeList()
  return (
    <Container>
      {isLoading ? <Loader2Icon className="loadingIcon" size={200} />
        : PokeList.map(pokemon => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))
      }
    </Container>
  )
}