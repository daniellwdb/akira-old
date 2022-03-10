import { Box, BoxProps } from "@chakra-ui/core";
import React from "react";

const HamburgerIconLine = (props: BoxProps) => (
  <Box
    h="2px"
    d="block"
    background="white"
    mb="7px"
    cursor="pointer"
    {...props}
  />
);

export const HamburgerIcon = (props: BoxProps) => (
  <Box {...props}>
    <HamburgerIconLine w="20px" ml="auto" />
    <HamburgerIconLine w={25} />
    <HamburgerIconLine w={16.5} float="right" mb={0} />
  </Box>
);
