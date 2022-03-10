import {
  Flex,
  FormLabel,
  Switch as ChakraSwitch,
  SwitchProps,
} from "@chakra-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IInputProps {
  label: string;
}

export const Switch = ({ label, ...props }: IInputProps & SwitchProps) => {
  const { register } = useFormContext<Record<string, unknown>>();

  return (
    <Flex align="center">
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <ChakraSwitch id={label} ref={register} {...props} />
    </Flex>
  );
};
