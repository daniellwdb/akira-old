import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/core";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export const ProfileDropdown = () => {
  const { data } = useMeQuery({ fetchPolicy: "cache-only" });
  const [logout, { client }] = useLogoutMutation();

  if (!data || !data.me) {
    return <Redirect to="/" />;
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="md"
          name={`${data.me.username}`}
          src={`https://cdn.discordapp.com/avatars/${data.me.id}/${data.me.avatar}.png`}
          ml={{ base: 0, lg: "1rem" }}
        />
      </MenuButton>
      <MenuList mt="20px !important">
        <MenuGroup
          title={`Logged in as: ${data.me.username}#${data.me.discriminator}`}
        >
          <MenuItem
            onClick={async () => {
              await logout();
              await client!.resetStore();
              window.location.assign("/");
            }}
          >
            Log out
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Actions:">
          <MenuItem>
            <Link to="/dashboard">Go to dashboard</Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
