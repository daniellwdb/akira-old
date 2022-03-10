import { Button, Link } from "@chakra-ui/core";
import { ButtonProps } from "@chakra-ui/core/dist/Button";
import React, { FC, Ref } from "react";
import {
  Link as ReactRouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

type LinkButtonProps = Omit<RouterLinkProps, "to"> &
  ButtonProps & {
    path: string;
    isExternal?: boolean;
    to?: string;
  };

export const LinkButton: FC<LinkButtonProps> = React.forwardRef(
  (props: LinkButtonProps, ref: Ref<ReactRouterLink>) => {
    if (props.isExternal) {
      return <Button ref={ref} as={Link} href={props.path} {...props} />;
    }

    return <Button ref={ref} as={ReactRouterLink} to={props.path} {...props} />;
  }
);
