import { capitalize } from "./capitalize"

export function getTypeInfo(types: string[]) {
    return types.map(type => {
        switch (type) {
            case 'bug':
                return { name: capitalize(type), color: '#99C32F', img: `images/types/${type}.png` }
            case 'dark':
                return { name: capitalize(type), color: '#5A5467', img: `images/types/${type}.png` }
            case 'dragon':
                return { name: capitalize(type), color: '#067ABE', img: `images/types/${type}.png` }
            case 'electric':
                return { name: capitalize(type), color: '#F9DF6D', img: `images/types/${type}.png` }
            case 'fairy':
                return { name: capitalize(type), color: '#F09CE3', img: `images/types/${type}.png` }
            case 'fighting':
                return { name: capitalize(type), color: '#E14451', img: `images/types/${type}.png` }
            case 'fire':
                return { name: capitalize(type), color: '#FFAC4C', img: `images/types/${type}.png` }
            case 'flying':
                return { name: capitalize(type), color: '#A2BBEB', img: `images/types/${type}.png` }
            case 'ghost':
                return { name: capitalize(type), color: '#596AB2', img: `images/types/${type}.png` }
            case 'grass':
                return { name: capitalize(type), color: '#5AC277', img: `images/types/${type}.png` }
            case 'ground':
                return { name: capitalize(type), color: '#D49566', img: `images/types/${type}.png` }
            case 'ice':
                return { name: capitalize(type), color: '#8CD9D3', img: `images/types/${type}.png` }
            case 'normal':
                return { name: capitalize(type), color: '#919AA1', img: `images/types/${type}.png` }
            case 'poison':
                return { name: capitalize(type), color: '#C361D3', img: `images/types/${type}.png` }
            case 'psychic':
                return { name: capitalize(type), color: '#FE9C95', img: `images/types/${type}.png` }
            case 'rock':
                return { name: capitalize(type), color: '#D4C992', img: `images/types/${type}.png` }
            case 'steel':
                return { name: capitalize(type), color: '#56A5A8', img: `images/types/${type}.png` }
            case 'water':
                return { name: capitalize(type), color: '#559CD9', img: `images/types/${type}.png` }
            case 'stellar':
                return { name: capitalize(type), color: '#FFFFFF', img: `images/types/${type}.png` }
            default:
                return { name: capitalize(type), color: '#919AA1', img: `images/types/${type}.png` }
        }
    })
}