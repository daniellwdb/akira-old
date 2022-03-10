import { Box, BoxProps } from "@chakra-ui/core";
import React, { FC } from "react";

export const Container: FC<BoxProps> = ({ children, ...props }) => (
  <Box
    w="100%"
    pr={15}
    pl={15}
    mx="auto"
    maxW={{ sm: 480, md: 768, lg: 960, xl: 1140 }}
    {...props}
  >
    {children}
  </Box>
);
