import React, { createElement, ReactElement } from "react";
import { DeepPartial, FormContext, OnSubmit, useForm } from "react-hook-form";

interface IFormProps<T> {
  defaultValues?: DeepPartial<T>;
  onSubmit: OnSubmit<T>;
  validationSchema?: unknown;
}

export function Form<T>({
  defaultValues,
  validationSchema,
  children,
  onSubmit,
}: IFormProps<T> & { children: ReactElement | ReactElement[] }) {
  const methods = useForm<T>({ defaultValues, validationSchema });

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map(child => {
              return child.props.name
                ? createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </form>
    </FormContext>
  );
}
