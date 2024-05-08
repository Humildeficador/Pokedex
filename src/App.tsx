import { Loader2Icon } from "lucide-react";
import { usePokeList } from "./hooks/usePokeList";

export function App() {
  const { PokeList, isLoading } = usePokeList()

  console.log(PokeList)

  return (
    <div>
      {isLoading ? <Loader2Icon className="loadingIcon" size={40}/>
        : PokeList.map(({ id, name, sprite }) => (
          <div key={id}>
            <img src={sprite} alt={name} />
          </div>
        ))
      }
    </div>
  )
}