import styled from "styled-components";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import { Item, QuantityInput } from "@webshop/molecules";
import { ClientItem } from "@webshop/models";
import { ButtonIcon } from "@webshop/atoms";
import Link from "next/link";

interface ItemProps {
  item: ClientItem;
  onAddToCart: (id: number, quantity: number) => void;
}
export const ItemResult: React.FunctionComponent<ItemProps> = ({
  item,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(
    item.amountInCart === undefined || item.amountInCart === 0
      ? 1
      : item.amountInCart
  );

  const addToCart = () => {
    onAddToCart(item.id, quantity);
  };
  return (
    <ItemContainer>
      <Item item={item} />

      <ItemActions>
        <div style={{ width: "128px" }}>
          <QuantityInput
            quantity={quantity}
            onChange={setQuantity}
            disabled={item.amountInCart === undefined || item.amountInCart > 0}
          />
        </div>
        {item.amountInCart === undefined || item.amountInCart === 0 ? (
          <ButtonIcon
            icon={<FaCartPlus />}
            category={"primary"}
            disabled={item.amountInCart === undefined || quantity === 0}
            onClick={addToCart}
            style={{ flex: 1 }}
          />
        ) : (
          <Link href={"/cart"} passHref={true}>
            <a style={{ display: "flex", flex: 1 }}>
              <ButtonIcon
                icon={<FaShoppingCart />}
                category={"secondary"}
                position={"right"}
                style={{ flex: 1 }}
              >
                Go to cart
              </ButtonIcon>
            </a>
          </Link>
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
