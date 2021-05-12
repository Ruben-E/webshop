import styled from "styled-components";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import { Item, QuantityInput } from "@webshop/molecules";
import { ItemModel } from "@webshop/models";
import { ButtonIcon } from "@webshop/atoms";

interface ItemProps {
  item: ItemModel;
  inCart: boolean;
  onAddToCart: (item: ItemModel, quantity: number) => void;
}
export const ItemResult: React.FunctionComponent<ItemProps> = ({
  item,
  inCart,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    onAddToCart(item, quantity);
  };
  return (
    <ItemContainer>
      <Item item={item} />
      <ItemActions>
        <div style={{ width: "128px" }}>
          <QuantityInput
            quantity={quantity}
            onChange={setQuantity}
            disabled={inCart}
          />
        </div>
        {!inCart ? (
          <ButtonIcon
            icon={<FaCartPlus />}
            category={"primary"}
            disabled={quantity === 0}
            onClick={addToCart}
            style={{ flex: 1 }}
          />
        ) : (
          <ButtonIcon
            icon={<FaShoppingCart />}
            category={"secondary"}
            position={"right"}
            style={{ flex: 1 }}
          >
            Go to cart
          </ButtonIcon>
        )}
      </ItemActions>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemActions = styled.div`
  margin-top: 8px;
  padding: 0 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
