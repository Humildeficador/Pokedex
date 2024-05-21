import { desaturate, saturate } from 'polished'
import styled from 'styled-components'

interface CardProps {
    $color: string
    $typeColor: string
}

export const Card = styled.div<CardProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;

    width: 315px;
    height: 450px;

    border: .615rem outset var(--yellow-300);
    padding: .25rem .5rem;
    
    background: ${props => props.$color};
    
    box-shadow: 1px 1px 15px 1px ${props => props.$color};

    transition: box-shadow .3s ease-out;

    cursor: pointer;

    &:hover {
        box-shadow: 5px 5px 30px 5px ${props => props.$color};
    }

    .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        
        .name {
            font-size: 1.25rem;
            font-weight: 500;
        }
        
        .hp {
            display: flex;
            align-items: center;
            gap: .25rem;

            font-size: 1.1rem;

            span {
                > span {
                    font-size: 50%;
                }
            }

            img {
                border: 1px inset #FFFFFF;
                border-radius: 100%;
            }
        }
    }
    
    .imagem {
        margin-bottom: 1rem;

        width: 100%;
        position: relative;

        display: flex;
        justify-content: center;

        background: ${props => desaturate(0.2, props.$typeColor || 'transparent')};

        border: .45rem inset ${props => saturate(0.2, props.$typeColor || '#FFFFFF')};
        border-bottom: 1.25rem inset ${props => saturate(0.2, props.$typeColor || '#FFFFFF')};
        border-radius: .5rem;

        img {
            transition: all .3s ease-out;
        }

        .description {
            width: 100%;
            position: absolute;
            bottom: -1.25rem;

            display: flex;
            justify-content: center;
            gap: .5rem;
            font-size: .75rem;
        }
    }

    &:hover .imagem img {
        translate: 10% -10%;
        filter: drop-shadow(5px 5px 5px ${props => props.$color});
        transform: scale(1.05);
    }
`

interface TypeCardContentProps {
    $color: string
}

export const Description = styled.div`
    width: 100%;
    height: 10rem;
`

export const TypeContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    width: 100%;
`

export const TypeContent = styled.div<TypeCardContentProps>`
    background: ${props => props.$color};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 8rem;
    height: 20%;
    border: 1px outset ${props => saturate(0.25, props.$color)};
    border-radius: .25rem;

    img {
        border: 1px inset #FFFFFF;
        border-radius: 100%;
    }
`

export const AbilityContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 80%;
    gap: .25rem;
`

export const AbilityContent = styled.div`
    font-size: .75rem;
    overflow-y: auto;
    > span {
        font-weight: 500;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: .25rem;
        margin: .25rem 0;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border: 1px solid #f1f1f1;
        border-radius: .25rem;
    }
`