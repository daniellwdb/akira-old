import { Box, BoxProps, Heading, Text } from "@chakra-ui/core";
import React, { FC } from "react";

interface IFeatureProps {
  title: string;
  desc: string;
}

export const Feature: FC<IFeatureProps & BoxProps> = ({
  title,
  desc,
  children,
  ...props
}) => (
  <Box p={5} shadow="md" borderWidth="1px" {...props}>
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{desc}</Text>
    {children}
  </Box>
);
