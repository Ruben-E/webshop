import styled from "styled-components";
import { CgSpinner } from "react-icons/cg";
import React, { HTMLAttributes } from "react";
import { Description } from "..";

const SpinnerIcon = styled(CgSpinner)`
  width: 100%;
  animation: spin infinite 1s linear;
  font-size: 64px;
  color: ${({ theme }) => theme.colors.primary.base};

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  overflow: hidden;
  text-align: center;
`;

export const Spinner: React.FunctionComponent<
  HTMLAttributes<HTMLDivElement>
> = ({ children, ...htmlAttributes }) => (
  <SpinnerContainer {...htmlAttributes}>
    <SpinnerIcon />
    {React.Children.count(children) > 0 && (
      <Description>{children}</Description>
    )}
  </SpinnerContainer>
);
