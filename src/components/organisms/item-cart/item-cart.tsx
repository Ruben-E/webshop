import styled from "styled-components";
import React from "react";
import { QuantityInput } from "@webshop/molecules";
import { ItemModel } from "@webshop/models";
import { ButtonIcon, Description, Link, Rating, Title } from "@webshop/atoms";
import { FaSave, FaTrash } from "react-icons/fa";

interface CartItemProps {
  item: ItemModel;
}
export const ItemCart: React.FunctionComponent<CartItemProps> = ({ item }) => {
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
          5 * 13.0
          <ItemActions>
            <QuantityInput quantity={1} onChange={() => {}} />
            <ButtonIcon icon={<FaSave />} category={"secondary"} />
            <ButtonIcon icon={<FaTrash />} category={"secondary"} />
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

const Subtitle = styled.p`
  font-size: 12px;
`;

const RightColumn = styled.div`
  margin-left: 8px;
`;

const ItemDescription = styled(Description)`
  margin-top: 8px;
`;

const ItemImage = styled.img`
  width: 122px;
  min-width: 122px;
  height: 90px;
  max-height: 90px;
  object-fit: contain;
`;
