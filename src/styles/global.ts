import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --slate-950: #020617;
        --zinc-100: #f4f4f5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--slate-950);
        color: var(--zinc-100);
    }

    body, input, textarea, button {
        font: 400 1rem 'Poppins', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    @media (max-width: 1080px) {
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 720px) {
        html {
            font-size: 87.5%;
        }
    }

    .loadingIcon {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        animation: rotate 2.5s ease-in-out infinite;
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