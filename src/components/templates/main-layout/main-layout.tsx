import styled from "styled-components";
import React from "react";

interface MainLayoutProps {
  headerContent: React.ReactNode;
}
const HEIGHT = 48;

const StyledMainLayout = styled.section`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
`;

const MainContent = styled.main`
  margin-top: ${HEIGHT}px;
  padding: 8px 0 0 0;
  overflow-y: auto;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FixedHeader = styled.header`
  height: ${HEIGHT}px;
  position: fixed;
  width: 100%;
  overflow: hidden;
  z-index: 99;
`;

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
  headerContent,
}) => (
  <StyledMainLayout>
    <FixedHeader>{headerContent}</FixedHeader>
    <MainContent>{children}</MainContent>
  </StyledMainLayout>
);
