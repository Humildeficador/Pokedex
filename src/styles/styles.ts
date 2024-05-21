import styled from 'styled-components'

export const Container = styled.main`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
    
    @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 700px) {
            grid-template-columns: 1fr;
    }
`