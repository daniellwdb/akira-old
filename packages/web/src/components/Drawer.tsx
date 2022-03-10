import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  List,
  ListItem,
} from "@chakra-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import logo from "../images/logo.png";
import { routes } from "../routes";
import { Layout } from "./Layout";
import { LinkButton } from "./LinkButton";

interface IDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Drawer = ({ onClose, isOpen }: IDrawerProps) => {
  const { loading, data } = useMeQuery({ fetchPolicy: "cache-only" });

  if (loading) {
    return <Layout />;
  }

  if (!data) {
    return <Redirect to="" />;
  }

  return (
    <ChakraDrawer onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={onClose} />
        <DrawerHeader borderBottomWidth="1px">
          <Image src={logo} alt="Logo" h={50} />
        </DrawerHeader>
        <DrawerBody>
          <List d="block" fontWeight="bold" spacing="24px">
            {routes.map(({ path, text, isExternal, newTab }, i) => (
              <ListItem key={i}>
                <LinkButton
                  path={path}
                  isExternal={isExternal}
                  variant="link"
                  d="block"
                  lineHeight="unset"
                  target={newTab ? "_blank" : undefined}
                >
                  {text}
                </LinkButton>
              </ListItem>
            ))}
            {!data.me && (
              <ListItem>
                <LinkButton
                  path={`${process.env.REACT_APP_SERVER_DOMAIN}/login`}
                  isExternal
                  variantColor="yellow"
                  w="100%"
                >
                  Log in
                </LinkButton>
              </ListItem>
            )}
          </List>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};
