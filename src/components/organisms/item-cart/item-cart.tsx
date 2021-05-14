import styled from "styled-components";
import React, { useState } from "react";
import { QuantityInput } from "@webshop/molecules";
import { ButtonIcon, Spinner, Title } from "@webshop/atoms";
import { FaSave, FaTrash } from "react-icons/fa";
import { CartItemModel } from "@webshop/models";

interface CartItemProps {
  item: CartItemModel;
  onSave: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
}
export const ItemCart: React.FunctionComponent<CartItemProps> = ({
  item,
  onDelete,
  onSave,
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  return (
    <ItemContainer>
      <Item>
        <LeftColumn>
          <ItemImage src={item.image} alt={"item"} />
        </LeftColumn>
        <RightColumn>
          <ItemTitle as={"header"} truncate={2}>
            {item.title}
          </ItemTitle>
          {item.quantity} x {item.price} ={" "}
          {item.total === "" ? <Spinner size={"sm"} /> : item.total}
          <ItemActions>
            <QuantityInput quantity={quantity} onChange={setQuantity} />
            <ButtonIcon
              icon={<FaSave />}
              category={"secondary"}
              onClick={() => onSave(item.id, quantity)}
              disabled={quantity === item.quantity}
            />
            <ButtonIcon
              icon={<FaTrash />}
              category={"secondary"}
              onClick={() => onDelete(item.id)}
            />
          </ItemActions>
        </RightColumn>
      </Item>
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

const Item = styled.div`
  display: flex;
`;

const LeftColumn = styled.div`
  text-align: center;
`;

const ItemTitle = styled(Title)`
  margin-bottom: 4px;
`;

const RightColumn = styled.div`
  margin-left: 8px;
`;

const ItemImage = styled.img`
  width: 122px;
  min-width: 122px;
  height: 90px;
  max-height: 90px;
  object-fit: contain;
`;
