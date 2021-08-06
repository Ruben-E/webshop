import styled, { css } from "styled-components";

export interface ButtonProps {
  category?: "primary" | "secondary" | "tertiary";
}

export const Button = styled.button<ButtonProps>`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid;
  transition: all 100ms ease;
  min-width: 35px;
  height: 32px;

  :disabled,
  button[disabled] {
    cursor: auto;
    opacity: 0.4;
  }

  ${({ category, theme: { colors } }) =>
    category === "primary"
      ? css`
          color: white;
          background-color: ${colors.primary.base};
          border-color: ${colors.primary.base};
          :hover:enabled{ {
            background-color: ${colors.primary.dark};
          }
        `
      : category === "secondary"
      ? css`
          color: ${colors.primary.base};
          background-color: white;
          border-color: ${colors.primary.base};
          :hover:enabled{ {
            border-color: ${colors.primary.dark};
          }
        `
      : category === "tertiary"
      ? css`
          color: ${colors.primary.base};
          background-color: white;
          border-color: white;
          :hover:enabled{ {
            color: white;
            background-color: ${colors.primary.dark};
          }
        `
      : css`
          color: grey;
          background-color: white;
          border-color: darkgray;
          :hover:enabled{ {
            border-color: gray;
          }
        `}
`;
