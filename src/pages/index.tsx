import React, { useEffect, useState } from "react";
import { HomePage } from "@webshop/pages";
import {
  FastItemsDocument,
  GQLItemsParams,
  SlowItemsDocument,
  useAddToCartMutation,
  useFastItemsQuery,
  useSlowItemsQuery,
} from "@webshop/graphql";
import gql from "graphql-tag";
import { ClientItem } from "@webshop/models";
import { normalize } from "@webshop/utils";
import { initializeApollo } from "./_app";

const PAGING: GQLItemsParams = {
  size: 6,
  page: 0,
};

export default function Index() {
  const [items, setItems] = useState<ClientItem[]>([]);

  const fastItemsQuery = useFastItemsQuery({
    variables: PAGING,
  });

  const slowItemsQuery = useSlowItemsQuery({
    variables: PAGING,
  });

  const fastItems = fastItemsQuery.data;
  const slowItems = slowItemsQuery.data;

  useEffect(() => {
    if (fastItems) {
      setItems(fastItems.items.content);
    }
  }, [fastItems]);

  useEffect(() => {
    if (fastItems && slowItems) {
      const slowUpdates = normalize(slowItems.items.content);
      setItems((items) =>
        items.map((item) => ({
          ...item,
          ...(slowUpdates[item.id] || {}),
        }))
      );
    }
  }, [fastItems, slowItems]);

  const [addToCartMutation] = useAddToCartMutation();

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addToCartMutation({
          variables: { id, quantity },
          refetchQueries: ["SlowItems"],
        });
      } catch (error) {
        console.error("Add item to cart failed", error);
      }
    })();
  };

  return (
    <HomePage
      addToCart={addToCart}
      itemsState={{
        loading: fastItemsQuery.loading,
        data: items,
        error: fastItemsQuery.error,
      }}
    />
  );
}

// /**
//  * Get fast items server-side
//  */
// export async function getStaticProps() {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query: FastItemsDocument,
//     variables: {
//       page: 0,
//       size: 6,
//     },
//   });
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
