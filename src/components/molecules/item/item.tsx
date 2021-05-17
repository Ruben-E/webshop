import React from "react";
import styled from "styled-components";
import { RemoteItem } from "@webshop/models";
import { Description, Link, Rating, Title } from "@webshop/atoms";

interface ItemProps {
  item: RemoteItem;
}

export const Item: React.FunctionComponent<ItemProps> = ({ item }) => (
  <ItemContainer>
    <LeftColumn>
      <ItemImage src={item.image} alt={"item"} />
      <Rating value={3.5} />
    </LeftColumn>
    <RightColumn>
      <ItemTitle as={"header"} truncate={2}>
        {item.title}
      </ItemTitle>
      <Subtitle>
        ${(item.price && item.price.toFixed(2)) || "?"}&nbsp; | &nbsp;
        <Link href="/login">{item.category}</Link>
      </Subtitle>
      <ItemDescription truncate={3}>{item.description}</ItemDescription>
    </RightColumn>
  </ItemContainer>
);

const ItemContainer = styled.div`
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
