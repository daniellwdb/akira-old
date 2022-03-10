import { DefaultTheme, theme as defaultTheme } from "@chakra-ui/core";

const mappings = {
  sm: "480px",
  md: "768px",
  lg: "960px",
  xl: "1140px",
};

const breakpoints = Object.assign(Object.values(mappings), mappings);

export const theme: DefaultTheme = {
  ...defaultTheme,
  breakpoints,
};
