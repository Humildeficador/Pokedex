import { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

export const GlobalStyle = createGlobalStyle`
    :root {
        --slate-950: #020617;
        --slate-800: #1e293b;
        --zinc-100: #f4f4f5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: rgb(34,193,195);
    background: linear-gradient(153deg, rgba(34,193,195,1) 0%, rgba(31,228,152,1) 48%, rgba(44,71,195,1) 100%);
        background-size: cover;
        background-attachment: fixed;
        color: var(--slate-950);   
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
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        /* background-color: var(--slate-950); */

        display: flex;
        align-items: center;
        justify-content: center;

        backdrop-filter: blur(20px);

        > svg {
            animation: rotate 2.5s ease-in-out infinite;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg); /* A partir de 0 graus de rotação */
        }
        to {
            transform: rotate(360deg); /* Até 360 graus de rotação */
        }
    }

    .loadingButton {
        display: flex;
        align-items: center;
        justify-content: center;

        background: #FCD20B;
        margin-top: 2rem;

        position: relative;

        .social {
            position: absolute;
            left: 2rem;
            display: flex;
            gap: 1rem;

            @media (max-width: 700px) {
                position: fixed;
                top: 1rem;
                left: 1rem;
                flex-direction: column;

                a {
                    border: 2px solid #FCD20B !important;
                    backdrop-filter: blur(10px);
                    svg {
                        stroke: #FCD20B !important;
                    }
                }
            }

            a {
                border: 2px solid var(--slate-950);
                border-radius: 10px;
                display: flex;
                align-items: center;
                padding: .25rem;
                background: transparent;

                transition: all .15s ease-out;

                cursor: pointer;
                
                svg {
                    transition: all .15s ease-out;
                    stroke: var(--slate-950);
                }

                &:hover {
                    background: var(--slate-950);

                    svg {
                        stroke: #FCD20B;
                    }
                }
            }
        }

        img {
            z-index: 999;
            width: 120px;

            position: absolute;
            right: 2rem;
            bottom: 0;

            cursor: pointer;
            filter: drop-shadow(1px 1px 5px ${lighten(0.3, '#FCD20B')});
            transition: all .2s ease-out;
            
            &:hover {
                filter: drop-shadow(1px 1px 10px #FCD20B);
            }

            @media (max-width: 700px) {
                right: .5rem;
                width: 100px;
            }
        }

        > button {
            height: 4rem;
            width: 20rem;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 1.315rem;
            font-weight: 500;

            border: none;
            outline: 5px solid var(--slate-950);

            border-radius: 20px;

            transition: all .15s ease-out;

            
            background: var(--zinc-100);
            &:hover {
                background: #FCD20B;
            }
        }
    }    
`