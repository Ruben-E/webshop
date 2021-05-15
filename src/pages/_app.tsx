import "../globals.css";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { defaultTheme } from "../theme/default";
import React, { useMemo } from "react";
import { Navigation } from "@webshop/organisms";
import { NAVIGATION } from "@webshop/config";
import { MainLayout } from "@webshop/templates";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export interface PageProps {
  currentRoute: string;
}

let apolloClient: ApolloClient<any>;

export function initializeApollo(initialState: Object | null = null) {
  const _apolloClient =
    apolloClient ??
    new ApolloClient({
      ssrMode: typeof window === "undefined", // set to true for SSR
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
export const useApollo = (initialState: any = null) =>
  useMemo(() => initializeApollo(initialState), [initialState]);

function MyApp({ Component, pageProps, router }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppLayout currentRoute={router.asPath}>
        <ApolloProvider client={apolloClient}>
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
