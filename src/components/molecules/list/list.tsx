import React from "react";
import { Divider } from "@webshop/atoms";
import styled from "styled-components";

export const List: React.FunctionComponent<
  React.HTMLAttributes<HTMLUListElement>
> = ({ children, ...attributes }) => (
  <StyledList {...attributes}>
    {React.Children.map(children, (element, index) => (
      <>
        {element}
        {index < React.Children.count(children) - 1 && <Divider />}
      </>
    ))}
  </StyledList>
);

const StyledList = styled.ul`
  width: 100%;
`;
