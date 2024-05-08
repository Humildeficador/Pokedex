import styled from "styled-components";

interface CardProps {
    $colors: string
}

export const Card = styled.div<CardProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    justify-self: center;
    width: 220px;
    height: 300px;
    position: relative;

    &::after {
        content: '';
        z-index: -10;
        position: absolute;
        width: 220px;
        height: 300px;
        background: ${(props) => props.$colors};
        filter: contrast(.3);
        border-radius: .25rem;
    }

    img {
        transition: all .2s;

        &:hover {
            translate: 10% -10%;
            filter: drop-shadow(5px 5px 5px ${props => props.$colors});
            transform: scale(1.05);
        }
    }

    div {
        border: 3px inset ${props => props.$colors};
        background-color: ${props => props.$colors}20;
        width: 90%;
        height: 3rem;
        text-align: center;
        align-content: center;
        border-radius: .5rem;

        span {
            text-shadow: 12px 12px 1px ${props => props.$colors};
        }
    }
`