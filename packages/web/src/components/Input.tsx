import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IInputProps {
  name: string;
  label: string;
}

export const Input = ({
  name,
  label,
  ...props
}: IInputProps & InputProps<HTMLInputElement>) => {
  const { register, errors } = useFormContext<Record<string, unknown>>();

  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        id={name}
        name={name}
        ref={register}
        variant="outline"
        {...props}
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
