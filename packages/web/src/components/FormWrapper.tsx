import { Box, BoxProps, Heading } from "@chakra-ui/core";
import React, { FC } from "react";

interface IFormWrapperProps {
  heading: string;
}

export const FormWrapper: FC<BoxProps & IFormWrapperProps> = ({
  heading,
  children,
  ...props
}) => (
  <Box p={8} backgroundColor="gray.700" {...props}>
    <Heading as="h3" size="lg" mb={4}>
      {heading}
    </Heading>
    {children}
  </Box>
);
