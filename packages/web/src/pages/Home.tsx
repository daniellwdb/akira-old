import { Box, ButtonGroup, Flex, Heading, Image, Text } from "@chakra-ui/core";
import React from "react";
import { Container } from "../components/Container";
import { Layout } from "../components/Layout";
import { LinkButton } from "../components/LinkButton";
import { SEO } from "../components/SEO";
import { useMeQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const Home = () => {
  const { data, loading } = useMeQuery();
  const btnBreakpoint = useMediaQuery("min-width: 768px");
  const btnBreakpointMax = useMediaQuery("max-width: 1139px");
  const btnWidth = btnBreakpoint && btnBreakpointMax ? "100%" : undefined;
  const btnSpacing = btnBreakpoint && btnBreakpointMax ? 4 : undefined;
  const loginUrl = data?.me
    ? "/dashboard"
    : `${process.env.REACT_APP_SERVER_DOMAIN}/login`;

  if (loading) {
    return <Layout withHeader={false} />;
  }

  return (
    <Layout>
      <SEO title="Home" description="A multipurpose Discord bot" />
      <Box
        as="section"
        pt={40}
        bgImage="linear-gradient(150deg, #267ac0, #144267)"
      >
        <Container>
          <Flex
            maxW={1000}
            m="auto"
            align="center"
            justify="space-between"
            direction={{ base: "column", md: "row" }}
          >
            <Flex flex="1 1 0" maxW={450}>
              <Box d="block" textAlign={{ base: "center", md: "left" }}>
                <Heading as="h1" size="xl" fontWeight="semibold">
                  Awesome multipurpose bot for Discord
                </Heading>
                <Text fontSize="xl" mt={6} fontWeight="normal">
                  Akira keeps growing since your suggestions are always welcome.
                </Text>
                <Box mt={6}>
                  <ButtonGroup spacing={4}>
                    <LinkButton
                      path={loginUrl}
                      isExternal={loginUrl !== "/dashboard"}
                      size="lg"
                      variantColor="yellow"
                      w={btnWidth}
                      mb={btnSpacing}
                    >
                      Add to Discord
                    </LinkButton>
                    <LinkButton
                      path="https://discord.gg/c7QPsSq"
                      isExternal
                      target="_blank"
                      size="lg"
                      variant="outline"
                      variantColor="yellow"
                      w={btnWidth}
                    >
                      Get support
                    </LinkButton>
                  </ButtonGroup>
                </Box>
              </Box>
            </Flex>
            <Image
              w="100%"
              maxW={600}
              d="flex"
              flex="1 1 0"
              alignSelf="flex-end"
              flexBasis={{ md: "auto" }}
              src="https://user-images.githubusercontent.com/44723767/69565051-70d8ae80-0fb4-11ea-9b57-ba4813f05807.png"
            />
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};
