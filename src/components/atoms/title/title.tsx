import styled, { css } from "styled-components";

interface TitleProps {
  truncate?: number;
}

export const Title = styled.h1<TitleProps>`
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  text-decoration: inherit;
  text-transform: inherit;
  ${({ truncate }) =>
    truncate! > 0 &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${truncate};
      -webkit-box-orient: vertical;
    `}
`;

Title.defaultProps = {
  truncate: 0,
};
