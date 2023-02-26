import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Jost', sans-serif;
        background-color: ${({ theme }) => theme.colors.whisperWhite};
    }

    h1{
        font-size: ${({ theme }) => theme.headingSize.xlarge};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height: 35px;
        letter-spacing: -0.33;
        color: ${({ theme }) => theme.colors.gunmetal};
    }

    h2{
        font-size: ${({ theme }) => theme.headingSize.large};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height: 29px;
        letter-spacing: -0.25;
        color: ${({ theme }) => theme.colors.gunmetal};


    }

    h3{
        font-size: ${({ theme }) => theme.headingSize.medium};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height: 26px;
        letter-spacing: -0.25;
        color: ${({ theme }) => theme.colors.gunmetal};

    }

    h4{
        font-size: ${({ theme }) => theme.headingSize.small};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height: 20px;
        letter-spacing: -0.2;
        color: ${({ theme }) => theme.colors.gunmetal};

    }

    a{
        text-decoration: none;
    }

    
`;
