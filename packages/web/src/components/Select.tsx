import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps,
} from "@chakra-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IOption {
  value: string;
  text: string;
}

interface ISelectProps {
  name: string;
  options: IOption[];
  label: string;
}

export const Select = ({
  name,
  options,
  label,
  ...props
}: ISelectProps & SelectProps) => {
  const { register, errors } = useFormContext<Record<string, unknown>>();

  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraSelect
        id={name}
        name={name}
        variant="outline"
        ref={register}
        {...props}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value} style={{ color: "black" }}>
            {option.text}
          </option>
        ))}
      </ChakraSelect>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
