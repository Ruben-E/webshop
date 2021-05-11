import styled, { css } from "styled-components";

interface DescriptionProps {
  truncate?: number;
}

export const Description = styled.p<DescriptionProps>`
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 400;
  opacity: 0.6;
  ${({ truncate }) =>
    truncate! > 0 &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${truncate};
      -webkit-box-orient: vertical;
    `}
`;

Description.defaultProps = {
  truncate: 0,
};
