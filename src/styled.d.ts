// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      steelBlue: string;
      white: string;
      darkSlateBlue: string;
      gunmetal: string;
      cornflowerBlue: string;
      lightSkyBlue: string;
      electricPurple: string;
      lavenderBlue: string;
      babyPowder: string;
      coral: string;
      whisperWhite: string;
    };

    bodySize: {
      small: string;
      medium: string;
      large: string;
    };

    headingSize: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };

    fontWeights: {
      regular: string;
      semiBold: string;
      bold: string;
    };
  }
}
