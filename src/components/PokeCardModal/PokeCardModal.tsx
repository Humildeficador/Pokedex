import { X as CloseButton } from 'lucide-react';
import ReactModal from "react-modal";
import { PokeListDetailsProps } from "../../utils/interfaces";
import styles from './styles.module.scss';

interface PokeCardModalProps {
  isOpen: boolean
  pokemon: PokeListDetailsProps | undefined
  onRequestClose: () => void
}

export function PokeCardModal({ isOpen, pokemon, onRequestClose }: PokeCardModalProps) {

  ReactModal.setAppElement('#root')
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.pokeCardModalContent}
      overlayClassName={styles.pokeCardModalOverlay}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className={styles.pokeCardModalCloseButton}
      >
        <CloseButton />
      </button>
      {pokemon &&
        <div className={styles.sprites}>
          <img src={pokemon.sprites.front_default} />
          <img src={pokemon.sprites.front_shiny} />
        </div>
      }
    </ReactModal>
  );
}