import { Button, ButtonProps } from "@chakra-ui/core";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

export const Submit: FC<ButtonProps> = ({ children, ...props }) => {
  const { formState } = useFormContext();

  return (
    <>
      <Button
        type="submit"
        backgroundColor="#267ac0"
        isDisabled={formState.isSubmitting}
        {...props}
      >
        {children}
      </Button>
    </>
  );
};
