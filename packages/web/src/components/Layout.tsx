import { ColorModeProvider, CSSReset } from "@chakra-ui/core";
import React, { FC } from "react";
import { Header } from "./Header";

interface ILayoutProps {
  withHeader?: boolean;
}

export const Layout: FC<ILayoutProps> = ({ withHeader = true, children }) => (
  <ColorModeProvider value="dark">
    <CSSReset />
    {withHeader && <Header />}
    {children}
  </ColorModeProvider>
);
