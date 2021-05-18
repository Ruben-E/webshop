import "../globals.css";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { defaultTheme } from "../theme/default";
import React from "react";
import { Navigation } from "@webshop/organisms";
import { NAVIGATION } from "@webshop/config";
import { MainLayout } from "@webshop/templates";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../graphql/client/client";

export interface PageProps {
  currentRoute: string;
}

function MyApp({
  Component,
  pageProps: { initialApolloState, ...pageProps },
  router,
}: AppProps) {
  if (initialApolloState) {
    console.log("SSR created state");
  }
  const client = useApollo(initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
        <AppLayout currentRoute={router.asPath}>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </ApolloProvider>
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
