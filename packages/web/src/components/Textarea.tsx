import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Textarea as ChakraTextarea,
} from "@chakra-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";

interface ITextareaProps {
  name: string;
  label: string;
}

export const Textarea = ({
  name,
  label,
  ...props
}: ITextareaProps & InputProps<HTMLInputElement>) => {
  const { register, errors } = useFormContext<Record<string, unknown>>();

  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraTextarea
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
