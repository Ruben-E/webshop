import styled, { css } from "styled-components";

export const Input = styled.input`
  border-radius: 8px;
  outline: none;
  padding: 8px;
  height: 32px;

  ${({ theme: { colors } }) => css`
    color: ${colors.primary.base};
    box-sizing: border-box;
    border: 1px solid ${colors.primary.base};
    :focus {
      border-color: ${colors.primary.dark};
    }
  `};

  :disabled,
  input[disabled] {
    cursor: auto;
    opacity: 0.4;
  }
`;
