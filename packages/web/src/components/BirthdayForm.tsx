import { Collapse, Flex, FormLabel, Switch, Text } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import {
  UpsertBirthdayConfigMutationVariables,
  useBirthdayConfigQuery,
  useDeleteBirthdayConfigMutation,
  useGuildQuery,
  useUpsertBirthdayConfigMutation,
} from "../generated/graphql";
import { Form } from "./Form";
import { FormWrapper } from "./FormWrapper";
import { Select } from "./Select";
import { Submit } from "./Submit";

export const BirthdayForm = () => {
  const { guildId } = useParams<{ guildId: string }>();
  const { data, loading } = useBirthdayConfigQuery({ variables: { guildId } });
  const [state, setState] = useState({ isEnabled: false, preferDM: false });
  const [upsert] = useUpsertBirthdayConfigMutation();
  const [deleteConfig] = useDeleteBirthdayConfigMutation();
  const alert = useAlert();

  const { data: guildData } = useGuildQuery({
    variables: { guildId },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    setState({
      isEnabled: Boolean(data?.config?.guildId),
      preferDM: !Boolean(data?.config?.announceChannelId),
    });
  }, [data]);

  if (!data || loading) {
    return <div>loading...</div>;
  }

  const onSubmit = async (values: UpsertBirthdayConfigMutationVariables) => {
    if (!state.isEnabled) {
      await deleteConfig({ variables: { guildId } });

      alert.show("All settings were saved succesfully", {
        type: "success",
      });

      return;
    }

    if (state.preferDM) {
      values.announceChannelId = null;
    }

    try {
      await upsert({
        variables: {
          guildId,
          announceChannelId: values.announceChannelId,
        },
      });

      alert.show("All settings were saved succesfully", { type: "success" });
    } catch (error) {
      console.log(error);

      alert.show("There was an error processing your request", {
        type: "error",
      });
    }
  };

  return (
    <Form<UpsertBirthdayConfigMutationVariables>
      onSubmit={onSubmit}
      defaultValues={{ announceChannelId: data.config?.announceChannelId }}
    >
      <FormWrapper heading="Birthday notifications">
        <Flex align="center">
          <FormLabel>Enabled</FormLabel>
          <Switch
            defaultIsChecked={Boolean(data.config?.guildId)}
            onChange={() =>
              setState(prevState => ({
                ...prevState,
                isEnabled: !prevState.isEnabled,
              }))
            }
          />
        </Flex>

        <Collapse isOpen={state.isEnabled}>
          <Text>
            Picking a channel is preferred, if a user has DM's disabled, I won't
            be able to notify them on their birthday, select a channel by
            clicking the switch below
          </Text>

          <Flex align="center" mt={4}>
            <FormLabel>Send message to user's DM</FormLabel>
            <Switch
              defaultIsChecked={!Boolean(data.config?.announceChannelId)}
              onChange={() =>
                setState(prevState => ({
                  ...prevState,
                  preferDM: !prevState.preferDM,
                }))
              }
            />
          </Flex>

          <Collapse isOpen={!state.preferDM} my={4}>
            <Select
              name="announceChannelId"
              label="Channel to send this message to"
              options={guildData!.guild!.channels.map(c => ({
                text: `#${c.name}`,
                value: c.id,
              }))}
            />
          </Collapse>
        </Collapse>

        <Submit mt={4}>Save settings</Submit>
      </FormWrapper>
    </Form>
  );
};
