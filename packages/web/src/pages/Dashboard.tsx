import { Avatar, Box, Flex, Heading, Link, Tooltip } from "@chakra-ui/core";
import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Container } from "../components/Container";
import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";
import { useGuildsQuery, useMeQuery } from "../generated/graphql";

export const Dashboard = () => {
  const { data: meData, loading: meDataLoading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const history = useHistory();
  const location = useLocation();

  const { data: guildsData, loading } = useGuildsQuery({
    fetchPolicy: "network-only",
  });

  const searchParams = new URLSearchParams(location.search);

  if (searchParams.has("error")) {
    return <Redirect to="/dashboard" />;
  }

  if (searchParams.has("guild_id")) {
    return <Redirect to={`/dashboard/${searchParams.get("guild_id")}`} />;
  }

  if (loading || meDataLoading) {
    return <Layout withHeader={false} />;
  }

  if (!meData || !meData.me || !guildsData) {
    return <Redirect to="/" />;
  }

  const guildsWithPerms = meData.me.guilds.filter(
    guild => (guild.permissions & (1 << 5)) === 1 << 5
  );

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="semibold">
              Please select a server
            </Heading>
            <Box mt={6} w="70%" mx="auto">
              <Flex align="center" justify="center" direction="row" wrap="wrap">
                {guildsWithPerms.map(guild => (
                  <Tooltip
                    key={guild.id}
                    hasArrow
                    label={guild.name}
                    placement="bottom"
                    aria-label={guild.name}
                  >
                    <Link
                      onClick={() =>
                        guildsData.guilds.includes(guild.id)
                          ? history.push(`/dashboard/${guild.id}`)
                          : window.location.assign(
                              `https://discordapp.com/oauth2/authorize?client_id=${
                                process.env.REACT_APP_CLIENT_ID
                              }&permissions=8&scope=bot&guild_id=${
                                guild.id
                              }&response_type=code&redirect_uri=${encodeURIComponent(
                                process.env.REACT_APP_CALLBACK_URL ||
                                  "http://localhost:3000/dashboard"
                              )}`
                            )
                      }
                    >
                      <Avatar
                        name={guild.name}
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`}
                        border="2px solid white"
                        m={15}
                      />
                    </Link>
                  </Tooltip>
                ))}
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
