import styled from "styled-components";
import { Button, ButtonIcon } from "@webshop/atoms";
import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavigationItem } from "@webshop/models";

const StyledNavigation = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.base};
  display: flex;
  justify-content: space-around;
  padding: 8px;
  flex: 1;
`;

const NavButton = styled(Button)`
  flex: 1;
`;
const NavIconButton = styled(ButtonIcon)`
  flex: 1;
`;

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  items,
}) => (
  <StyledNavigation>
    {items.map((item, index) => (
      <Link href={item.url} key={`${item.type}--${index}`}>
        <a>
          {item.type === "icon" ? (
            <NavIconButton
              category={"primary"}
              icon={
                item.icon === "shopping-cart" ? <FaShoppingCart /> : <FaUser />
              }
              disabled={item.active}
            />
          ) : (
            <NavButton category={"primary"} disabled={item.active}>
              {item.text}
            </NavButton>
          )}
        </a>
      </Link>
    ))}
  </StyledNavigation>
);
