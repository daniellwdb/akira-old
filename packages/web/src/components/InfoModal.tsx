import {
  BoxProps,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/core";
import React from "react";

interface IInfoModalProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export const InfoModal = (props: IInfoModalProps & BoxProps) => (
  <>
    <Text
      onClick={props.onOpen}
      color="blue.500"
      cursor="pointer"
      mb={props.mb}
    >
      This field supports special syntax (click for info)
    </Text>

    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Special syntax</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              You can use special syntax to display information in the actual
              message that gets send to Discord.
            </Text>
            <Text>
              <strong>{"{{user}}"} </strong>
              gets replaced with a mention, for example:{" "}
              <strong>{"Welcome, {{user}}"} </strong>
              becomes: <strong>Welcome, @Akira</strong>
            </Text>
            <Text>
              <strong>{"{{tag}}"} </strong>
              gets replaced with the user's tag, for example:{" "}
              <strong>{"Welcome, {{tag}}"} </strong>
              becomes: <strong>Welcome, Akira#0044</strong>
            </Text>
            <Text>
              <strong>{"<#<channel id>>"} </strong>
              gets replaced with a channel mention, use the "channelid" command
              to get a channel's ID, for example:{" "}
              <strong>{"Please read <#647864532047364110>"} </strong>
              becomes: <strong>Please read #rules-and-info</strong>
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
