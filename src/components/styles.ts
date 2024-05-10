import styled from "styled-components";
import { desaturate, saturate } from 'polished'

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

    border: .615rem outset #FFE368;
    padding: .25rem .5rem;

    background: ${props => props.$color};

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
        margin-bottom: 2rem;

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

interface TypeCardContainerProps {
    $color: string
}

export const TypeCardContainer = styled.div<TypeCardContainerProps>`
    background: ${props => props.$color};
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 8rem;
`