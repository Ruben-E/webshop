import styled from "styled-components";
import React from "react";

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary.base};
  :hover {
    text-decoration: underline;
  }
`;
