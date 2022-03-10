import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/core";
import React from "react";
import { Container } from "../components/Container";
import { Feature } from "../components/Feature";
import { Layout } from "../components/Layout";
import { useCommandCategoriesQuery } from "../generated/graphql";

export const Commands = () => {
  const { data, loading } = useCommandCategoriesQuery();

  if (!data || loading) {
    return <Layout withHeader={false} />;
  }

  return (
    <Layout>
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Text fontSize="2xl" mb={8}>
            Commands by category
          </Text>

          <Tabs>
            <TabList>
              {data.commandCategories.map((_, index) => (
                <Tab key={index}>{data.commandCategories[index].category}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {data.commandCategories.map((res, index) => (
                <TabPanel key={index}>
                  {res.commands.map((cmd, index) => (
                    <Feature
                      key={index}
                      title={`${cmd.name} ${
                        cmd.config.aliases
                          ? `(${cmd.config.aliases.join(" / ")})`
                          : ""
                      }`}
                      desc={cmd.config.description}
                      mt={4}
                    >
                      {cmd.config.usage && (
                        <Text mt={2}>
                          <strong>Usage:</strong> {cmd.config.usage}
                        </Text>
                      )}
                      {cmd.config.examples && (
                        <Text mt={2}>
                          <strong>Examples:</strong>{" "}
                          {cmd.config.examples.map(example => (
                            <Text>
                              !{cmd.name} {example}
                            </Text>
                          ))}
                        </Text>
                      )}
                      {cmd.config.permissions && (
                        <Stack spacing={4} isInline mt={2}>
                          <Text>
                            <strong>Required permissions:</strong>
                          </Text>
                          {cmd.config.permissions.map((perm, index) => (
                            <Tag size="md" key={index} variantColor="cyan">
                              {perm}
                            </Tag>
                          ))}
                        </Stack>
                      )}
                    </Feature>
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  );
};
