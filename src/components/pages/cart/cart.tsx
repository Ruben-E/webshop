import { Divider, Spinner, Title } from "@webshop/atoms";
import { List } from "@webshop/molecules";
import { ItemCart } from "@webshop/organisms";
import React from "react";
import { CartItemModel, RequestState } from "@webshop/models";
import styled from "styled-components";

interface CartPageProps {
  cartState: RequestState<CartItemModel[]>;
  totalPriceState: RequestState<string>;
  removeItem: (id: number) => void;
  saveItem: (id: number, quantity: number) => void;
}

export const CartPage: React.FunctionComponent<CartPageProps> = ({
  cartState: { loading, data, error },
  totalPriceState,
  removeItem,
  saveItem,
}) =>
  loading ? (
    <Spinner style={{ alignSelf: "center" }} />
  ) : error ? (
    <p style={{ alignSelf: "center" }}>Error</p>
  ) : data ? (
    <CartContainer>
      <List>
        {data.map((item) => (
          <li key={item.title}>
            <ItemCart item={item} onDelete={removeItem} onSave={saveItem} />
          </li>
        ))}
      </List>
      <Divider />
      {totalPriceState.loading ? (
        <Spinner size={"sm"}>Loading total price</Spinner>
      ) : (
        totalPriceState.data && (
          <Title style={{ textAlign: "center" }}>
            Total price: {totalPriceState.data}
          </Title>
        )
      )}
    </CartContainer>
  ) : (
    <p>No data</p>
  );

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
