import { PokeListDetailsProps } from '../hooks/usePokeList';
import { capitalize } from '../utils/capitalize';
import { getTypeInfo } from './getTypeInfo';
import { Card, TypeCardContainer } from './styles';

interface PokeCardProps {
    pokemon: PokeListDetailsProps
}

export function PokeCard({ pokemon: { id, name, sprite, types, hp, height, weight, color } }: PokeCardProps) {

    const pokeTypes = getTypeInfo(types)

    return (
        <Card $color={color} $typeColor={pokeTypes[0].color}>
            <div className="title">
                <span className='name'>{capitalize(name)}</span>
                <div className='hp'>
                    <span>
                        <span>ps</span>
                        {hp}
                    </span>
                    <img
                        src={pokeTypes[0].img}
                        alt={pokeTypes[0].name}
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div className='imagem'>
                <img src={sprite} alt={name} width={200} height={200} />
                <div className='description'>
                    <span className='id'>Nº{id.toString().padStart(3, '0')}</span>
                    <span className='height'>Altura: {height.toFixed(1)}m</span>
                    <span className='weight'>Peso: {weight}kg</span>
                </div>
            </div>
            {pokeTypes.map(type =>
                <TypeCard
                    key={name + type.name}
                    src={type.img}
                    name={type.name}
                    size={20}
                    color={type.color}
                />
            )}
        </Card>
    );
}

interface TypeCardProps {
    src: string
    name: string
    size: number
    color: string
}

function TypeCard({ size, src, name, color }: TypeCardProps) {
    return (
        <TypeCardContainer $color={color}>
            <img src={src} alt={name} width={size} height={size} />
            <span>{name}</span>
        </TypeCardContainer>
    );
}