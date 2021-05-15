import "../globals.css";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { defaultTheme } from "../theme/default";
import React from "react";
import { Navigation } from "@webshop/organisms";
import { NAVIGATION } from "@webshop/config";
import { MainLayout } from "@webshop/templates";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export interface PageProps {
  currentRoute: string;
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/\n",
    cache: new InMemoryCache(),
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout currentRoute={router.asPath}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppLayout>
    </ThemeProvider>
  );
}

export default MyApp;

export const AppLayout: React.FunctionComponent<PageProps> = ({
  children,
  currentRoute,
}) => {
  const navigation = NAVIGATION.map((item) => ({
    ...item,
    active: currentRoute === item.url,
  }));
  return (
    <MainLayout headerContent={<Navigation items={navigation} />}>
      {children}
    </MainLayout>
  );
};
