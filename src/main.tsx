import { App } from './App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global'
import { PokeListProvider } from './hooks/usePokeList/usePokeList'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokeListProvider>
      <App />
      <GlobalStyle />
    </PokeListProvider>
  </StrictMode>,
)