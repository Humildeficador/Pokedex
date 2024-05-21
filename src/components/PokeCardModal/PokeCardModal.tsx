import { X as CloseButton, Sword, Swords, Shield, ShieldPlus, Heart, Gauge } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { PokeListDetailsProps } from '../../utils/interfaces'
import styles from './styles.module.scss'

interface PokeCardModalProps {
  isOpen: boolean
  pokemon: PokeListDetailsProps | undefined
  onRequestClose: () => void
}

export function PokeCardModal({ isOpen, pokemon, onRequestClose }: PokeCardModalProps) {
  ReactModal.setAppElement('#root')
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    const imgShiny = new Image()
    imgShiny.src = pokemon ? pokemon.sprites.frontShiny : ''
  }, [pokemon])

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose()
        setIsShiny(false)
      }}
      className={styles.pokeCardModalContent}
      overlayClassName={styles.pokeCardModalOverlay}
    >
      <button
        type="button"
        onClick={() => {
          onRequestClose()
          setIsShiny(false)
        }}
        className={styles.pokeCardModalCloseButton}
      >
        <CloseButton />
      </button>
      {pokemon &&
        <>
          <div className={styles.sprites}>
            <img
              src={isShiny
                ? pokemon.sprites.frontShiny
                : pokemon.sprites.frontDefault}
              style={{filter: `drop-shadow(0px 0px 5px ${pokemon.color})`}}
            />
            <button
              onClick={() => { setIsShiny(!isShiny) }}
              style={{border: `2px solid ${pokemon.color}`}}
            >
              {isShiny ? 'Default' : 'Shiny'}
            </button>
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.stats}>
              <Heart color='#FE0000' strokeWidth={2.5} />
              <span style={{ color: '#FE0000', fontWeight: 500 }}>
                HP:
              </span>
              <span>{pokemon.stats.hp}</span>
            </div>
            <div className={styles.stats}>
              <Sword color='#FE8100' strokeWidth={2.5} />
              <span style={{ color: '#FE8100', fontWeight: 500 }}>
                Ataque:
              </span>
              <span>{pokemon.stats.atack}</span>
            </div>
            <div className={styles.stats}>
              <Shield color='#3566CD' strokeWidth={2.5} />
              <span style={{ color: '#3566CD', fontWeight: 500 }}>
                Defesa:
              </span>
              <span>{pokemon.stats.defense}</span>
            </div>
            <div className={styles.stats}>
              <Swords color='#FE6400' strokeWidth={2.5} />
              <span style={{ color: '#FE6400', fontWeight: 500 }}>
                Ataque Especial:
              </span>
              <span>{pokemon.stats.specialAtack}</span>
            </div>
            <div className={styles.stats}>
              <ShieldPlus color='#2D5AFF' strokeWidth={2.5} />
              <span style={{ color: '#2D5AFF', fontWeight: 500 }}>
                Defesa Especial:
              </span>
              <span>{pokemon.stats.specialDefense}</span>
            </div>
            <div className={styles.stats}>
              <Gauge color='#75C9D5' strokeWidth={2.5} />
              <span style={{ color: '#75C9D5', fontWeight: 500 }}>
                Velocidade:
              </span>
              <span>{pokemon.stats.speed}</span>
            </div>
          </div>
        </>
      }
    </ReactModal>
  )
}