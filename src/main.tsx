import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { PokeListProvider } from './hooks/usePokeList/usePokeList'
import { GlobalStyle } from './styles/global'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PokeListProvider>
      <App />
    </PokeListProvider>
    <GlobalStyle />
  </React.StrictMode>,
)