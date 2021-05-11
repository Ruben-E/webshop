import React, { Children } from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "@webshop/atoms";

interface ButtonWithIconProps extends ButtonProps {
  icon: React.ReactNode;
  position?: "left" | "right";
}

interface StyledButtonProps extends Pick<ButtonWithIconProps, "position"> {
  applySvgMargin: boolean;
}

const SPACE_BETWEEN_ICON_AND_TEXT = 6;

const StyledIconButtonButton = styled(Button)<StyledButtonProps>`
  svg {
    position: relative;
    vertical-align: middle;
    margin: ${({ position, applySvgMargin }) =>
      !applySvgMargin
        ? "0"
        : position === "left"
        ? `0 ${SPACE_BETWEEN_ICON_AND_TEXT}px 0 0`
        : `0 0 0 ${SPACE_BETWEEN_ICON_AND_TEXT}px`};

    top: ${({ applySvgMargin }) => (!applySvgMargin ? -2 : -1)}px;
  }
`;

export const ButtonIcon: React.FunctionComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonWithIconProps
> = ({ children, icon, position = "left", ...buttonAttributes }) => (
  <StyledIconButtonButton
    {...buttonAttributes}
    position={position}
    applySvgMargin={Children.count(children) > 0}
  >
    {position === "left" ? icon : children}
    {position === "left" ? children : icon}
  </StyledIconButtonButton>
);
