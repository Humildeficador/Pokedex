import { extractColors } from 'extract-colors';
import { useEffect, useState } from 'react';
import { Card } from './styles';
import { capitalize } from '../utils/capitalize';

interface PokeCardProps {
    pokemon: {
        id: number
        name: string
        sprite: string
    }
}

export function PokeCard({ pokemon: { name, sprite } }: PokeCardProps) {
    const [colors, setColors] = useState<string>('')

    useEffect(() => {
        async function fetchColors() {
            try {
                const extractedColors = await extractColors(sprite, { crossOrigin: 'anonymous', distance: 1 })
                setColors(extractedColors[0].hex)
            } catch (error) {
                console.error(error)
            }
        }
        fetchColors()
    }, [sprite])

    return (
        <Card $colors={colors}>
            <img src={sprite} alt={name} width={200} height={200} />
            <div>
                <span>{capitalize(name)}</span>
            </div>
        </Card>
    );
}