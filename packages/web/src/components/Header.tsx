import {
  Box,
  Image,
  Link,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useWindowScroll } from "../hooks/useWindowScroll";
import logo from "../images/logo.png";
import { routes } from "../routes";
import { Container } from "./Container";
import { Drawer } from "./Drawer";
import { HamburgerIcon } from "./HamburgerIcon";
import { LinkButton } from "./LinkButton";
import { ProfileDropdown } from "./ProfileDropdown";

export const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { loading, data } = useMeQuery();
  const { y } = useWindowScroll();
  const isSmall = useMediaQuery("max-width: 576px");
  const disclosure = useDisclosure();
  const maxLinkWidth = y === 0 ? 80 : 60;

  const loginUrl = data?.me
    ? "/dashboard"
    : `${process.env.REACT_APP_SERVER_DOMAIN}/login`;

  if (loading) {
    return <div />;
  }

  return (
    <Box
      as="header"
      pos="fixed"
      w="100%"
      pb="1rem"
      pt={{ base: "1rem", sm: "1.5rem", lg: "3rem" }}
      bg={isHome ? "transparent" : y === 0 ? "transparent" : "#1A202C"}
      borderBottom={isHome ? "none" : y === 0 ? undefined : "1px solid gray"}
      zIndex={999}
    >
      <Container d="flex" alignItems="center">
        <Link
          href="/"
          maxW={isSmall ? 50 : maxLinkWidth}
          transition="max-width .3s"
          mr="auto"
        >
          <Image src={logo} alt="Logo" maxW="100%" h="auto" />
        </Link>
        <Box as="nav" d={{ base: "none", lg: "block" }}>
          <List d="flex" flexWrap="wrap" fontWeight="bold">
            {routes.map(({ path, text, isExternal, newTab }, i) => (
              <ListItem key={i} d="flex" alignItems="center">
                <LinkButton
                  path={path}
                  isExternal={isExternal}
                  variant="link"
                  d="block"
                  p=".5rem 1rem"
                  lineHeight="unset"
                  target={newTab ? "_blank" : undefined}
                >
                  {text}
                </LinkButton>
              </ListItem>
            ))}
            <ListItem>
              {data?.me ? (
                <ProfileDropdown />
              ) : (
                <LinkButton
                  path={loginUrl}
                  isExternal={loginUrl !== "/dashboard"}
                  variantColor="yellow"
                  ml="1rem"
                >
                  Log in
                </LinkButton>
              )}
            </ListItem>
          </List>
        </Box>
        {data?.me && (
          <Box d={{ base: "block", lg: "none" }}>
            <ProfileDropdown />
          </Box>
        )}
        <HamburgerIcon
          onClick={disclosure.onOpen}
          ml="auto"
          d={{ base: "block", lg: "none" }}
        />
        <Drawer {...disclosure} />
      </Container>
    </Box>
  );
};
