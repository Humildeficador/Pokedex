import styled from "styled-components";

export const Container = styled.main`
    .loadingIcon {
        animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg); /* A partir de 0 graus de rotação */
        }
        to {
            transform: rotate(360deg); /* Até 360 graus de rotação */
        }
    } 
`