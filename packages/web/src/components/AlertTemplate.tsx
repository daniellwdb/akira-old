import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  Flex,
  Text,
} from "@chakra-ui/core";
import React from "react";
import { AlertComponentProps } from "react-alert";

export const AlertTemplate = ({
  options,
  message,
  close,
}: AlertComponentProps) => (
  <Alert status={options.type} my={3}>
    <Flex align="center">
      <AlertIcon />
      <AlertDescription>
        <Text color="black">{message}</Text>
      </AlertDescription>
      <CloseButton onClick={close} color="black" ml={10} />
    </Flex>
  </Alert>
);
