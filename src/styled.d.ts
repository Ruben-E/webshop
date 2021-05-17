import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        base: string;
        light: string;
        dark: string;
      };
      secondary: string;
    };
  }
}
