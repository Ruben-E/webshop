import styled from "styled-components";
import { CgSpinner } from "react-icons/cg";
import React, { HTMLAttributes } from "react";
import { Description } from "..";

const SpinnerIcon = styled(CgSpinner)`
  animation: spin infinite 1s linear;
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
  display: inline-block;
`;

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const Spinner: React.FunctionComponent<
  HTMLAttributes<HTMLDivElement> & SpinnerProps
> = ({ children, size, ...htmlAttributes }) => (
  <SpinnerContainer {...htmlAttributes}>
    <SpinnerIcon size={size === "sm" ? "16" : "md" ? "32" : "64"} />
    {React.Children.count(children) > 0 && (
      <Description>{children}</Description>
    )}
  </SpinnerContainer>
);
