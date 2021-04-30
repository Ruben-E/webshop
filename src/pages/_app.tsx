import "../globals.css";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { defaultTheme } from "../theme/default";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
