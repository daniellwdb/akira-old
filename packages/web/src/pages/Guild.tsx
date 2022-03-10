import { guildConfigSchema } from "@akira/common";
import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  Flex,
  FormLabel,
  SimpleGrid,
  Stack,
  Switch as ChakraSwitch,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/core";
import format from "date-fns/format";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Redirect, useParams } from "react-router-dom";
import { BirthdayForm } from "../components/BirthdayForm";
import { Container } from "../components/Container";
import { DeletePresenceAlert } from "../components/DeletePresenceAlert";
import { Form } from "../components/Form";
import { FormWrapper } from "../components/FormWrapper";
import { InfoModal } from "../components/InfoModal";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { Submit } from "../components/Submit";
import { Switch } from "../components/Switch";
import { Textarea } from "../components/Textarea";
import {
  GuildInput,
  useCommandsQuery,
  useDeletePresenceMutation,
  useGuildQuery,
  useMeQuery,
  usePresencesQuery,
  useToggleCommandMutation,
  useUpdateGuildMutation,
} from "../generated/graphql";

type UserGuildInput = Omit<GuildInput, "guildId">;

export const Guild = () => {
  const { guildId } = useParams<{ guildId: string }>();
  const { data: meData } = useMeQuery();
  const [updateGuild] = useUpdateGuildMutation();
  const [toggleCommand] = useToggleCommandMutation();
  const [deletePresence] = useDeletePresenceMutation();
  const alert = useAlert();
  const disclosure = useDisclosure();
  const [clipboard, setClipboard] = useState("");
  const { onCopy } = useClipboard(clipboard);

  const [open, setOpen] = useState({
    welcomeOptions: false,
    welcomeRoleOption: false,
    preferenceOptions: false,
    leaveOptions: false,
  });

  const { data: commandsData, loading: commandsLoading } = useCommandsQuery({
    fetchPolicy: "network-only",
  });

  const { data, loading } = useGuildQuery({
    fetchPolicy: "network-only",
    variables: { guildId },
  });

  const {
    data: presencesData,
    loading: presencesLoading,
    refetch,
  } = usePresencesQuery({
    fetchPolicy: "network-only",
    variables: { guildId },
  });

  useEffect(() => {
    setOpen({
      welcomeOptions: Boolean(data?.guild?.welcomeMessage),
      welcomeRoleOption: Boolean(data?.guild?.welcomeRoleId),
      preferenceOptions: !data?.guild?.preferDM!,
      leaveOptions: Boolean(data?.guild?.leaveMessage),
    });
  }, [data]);

  const getDisplayName = (userId: string) => {
    return members.find(member => member.id === userId)?.name;
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "MMMM dd yyyy");
  };

  const onGuildConfigSubmit = async (values: UserGuildInput) => {
    try {
      if (!open.welcomeOptions) {
        values.welcomeMessage = null;
        values.welcomeChannelId = null;
      }

      if (!open.welcomeRoleOption) {
        values.welcomeRoleId = null;
      }

      if (!open.preferenceOptions) {
        values.welcomeChannelId = null;
      }

      if (!open.leaveOptions) {
        values.leaveMessage = null;
        values.leaveChannelId = null;
      }

      await updateGuild({ variables: { input: { ...values, guildId } } });
      alert.show("All settings were saved succesfully", { type: "success" });
    } catch (error) {
      console.log(error);

      alert.show("There was an error processing your request", {
        type: "error",
      });
    }
  };

  if (loading || commandsLoading || presencesLoading) {
    return <Layout />;
  }

  if (!data || !data.guild || !meData || !meData.me || !commandsData) {
    return <Redirect to="/dashboard" />;
  }

  const guild = meData.me.guilds.find(guild => guild.id === guildId);

  const {
    prefix,
    language,
    disabledCommands,
    welcomeMessage,
    welcomeChannelId,
    preferDM,
    welcomeRoleId,
    leaveMessage,
    leaveChannelId,
    channels,
    roles,
    members,
  } = data.guild;

  return (
    <Layout>
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Text fontSize="2xl" mb={8}>
            Showing settings for: <strong>{guild!.name}</strong>
          </Text>

          <SimpleGrid
            alignItems="flex-start"
            columns={[1, 2]}
            spacingX={4}
            spacingY={4}
          >
            <Form<UserGuildInput>
              defaultValues={{
                prefix,
                language,
                welcomeMessage,
                welcomeChannelId,
                welcomeRoleId,
                preferDM,
                leaveMessage,
                leaveChannelId,
              }}
              validationSchema={guildConfigSchema}
              onSubmit={onGuildConfigSubmit}
            >
              <FormWrapper heading="General configuration">
                <Stack spacing={4}>
                  <Input name="prefix" label="Prefix" />
                  <Select
                    name="language"
                    label="Akira's language"
                    options={[
                      { text: "en-US", value: "en-US" },
                      { text: "nl-NL", value: "nl-NL" },
                    ]}
                  />

                  <Flex align="center">
                    <FormLabel>
                      Enable actions for members who join the server
                    </FormLabel>
                    <ChakraSwitch
                      defaultIsChecked={Boolean(welcomeMessage)}
                      onChange={() =>
                        setOpen({
                          ...open,
                          welcomeOptions: !open.welcomeOptions,
                        })
                      }
                    />
                  </Flex>

                  <Collapse isOpen={open.welcomeOptions}>
                    <Textarea name="welcomeMessage" label="Type a message" />
                    <InfoModal {...disclosure} />
                    <Switch
                      name="preferDM"
                      label="Send message to user's DM"
                      my={4}
                      onChange={() =>
                        setOpen({
                          ...open,
                          preferenceOptions: !open.preferenceOptions,
                        })
                      }
                    />
                    <Collapse isOpen={open.preferenceOptions}>
                      <Select
                        name="welcomeChannelId"
                        label="Channel to send this message to"
                        options={channels.map(c => ({
                          value: c.id,
                          text: `#${c.name}`,
                        }))}
                      />
                    </Collapse>
                    <Flex align="center">
                      <FormLabel>Add role to new user</FormLabel>
                      <ChakraSwitch
                        my={4}
                        defaultIsChecked={Boolean(welcomeRoleId)}
                        onChange={() =>
                          setOpen({
                            ...open,
                            welcomeRoleOption: !open.welcomeRoleOption,
                          })
                        }
                      />
                    </Flex>
                    <Collapse isOpen={open.welcomeRoleOption}>
                      <Select
                        name="welcomeRoleId"
                        label="Select a role"
                        options={roles.map(r => ({
                          value: r.id,
                          text: `@${r.name}`,
                        }))}
                      />
                    </Collapse>
                  </Collapse>

                  <Flex align="center">
                    <FormLabel>
                      Enable actions for members who leave the server
                    </FormLabel>
                    <ChakraSwitch
                      defaultIsChecked={Boolean(leaveMessage)}
                      onChange={() =>
                        setOpen({
                          ...open,
                          leaveOptions: !open.leaveOptions,
                        })
                      }
                    />
                  </Flex>
                  <Collapse isOpen={open.leaveOptions}>
                    <Textarea name="leaveMessage" label="Type a message" />
                    <InfoModal {...disclosure} mb={4} />
                    <Select
                      name="leaveChannelId"
                      label="Channel to send this message to"
                      options={channels.map(c => ({
                        value: c.id,
                        text: `#${c.name}`,
                      }))}
                      mb={4}
                    />
                  </Collapse>
                </Stack>

                <Submit>Save settings</Submit>
              </FormWrapper>
            </Form>

            <FormWrapper heading="Enabled commands">
              <Text fontSize="md" mb={4}>
                Changes are saved as you toggle.
              </Text>
              <SimpleGrid columns={2} spacingX={2} spacingY={4}>
                {commandsData.commands.map(command => (
                  <Flex align="center" key={command.name}>
                    <FormLabel htmlFor={command.name}>{command.name}</FormLabel>
                    <ChakraSwitch
                      id={command.name}
                      onChange={async () =>
                        await toggleCommand({
                          variables: {
                            input: { guildId, commandName: command.name },
                          },
                        })
                      }
                      defaultIsChecked={
                        !disabledCommands.some(cmd => cmd.name === command.name)
                      }
                    />
                  </Flex>
                ))}
              </SimpleGrid>
            </FormWrapper>

            <FormWrapper heading="AFK people">
              <Accordion allowToggle>
                {presencesData && presencesData.presences.length ? (
                  <Fragment>
                    {presencesData.presences.map(presence => (
                      <AccordionItem key={presence.id}>
                        <AccordionHeader
                          _expanded={{ bg: "#267ac0", color: "white" }}
                        >
                          <Box flex="1" textAlign="left">
                            <strong>{getDisplayName(presence.userId)}</strong>
                          </Box>
                          <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel pb={4}>
                          <Text>
                            AFK since: {formatDate(presence.createdDate)}
                          </Text>
                          <Text>
                            Reason: <i>"{presence.status}"</i>
                          </Text>
                          <DeletePresenceAlert
                            name={getDisplayName(presence.userId)!}
                            action={async () => {
                              await deletePresence({
                                variables: { presenceId: presence.id },
                              });

                              await refetch();
                            }}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                    <Button
                      backgroundColor="#267ac0"
                      mt={4}
                      onClick={() => {
                        setClipboard(
                          presencesData?.presences
                            .map(
                              presence =>
                                `${getDisplayName(
                                  presence.userId
                                )} - ${formatDate(presence.createdDate)}\n${
                                  presence.status
                                }`
                            )
                            .join("\n\n") ??
                            "No people set their status to AFK yet"
                        );

                        onCopy!();

                        alert.show("Successfully copied data to clipboard", {
                          type: "info",
                        });
                      }}
                    >
                      Copy all to clipboard
                    </Button>
                  </Fragment>
                ) : (
                  <Text>No people set their status to AFK yet</Text>
                )}
              </Accordion>
            </FormWrapper>

            <BirthdayForm />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
};
