import React from "react";
import { Helmet } from "react-helmet-async";

interface ISEOProps {
  readonly title: string;
  readonly description?: string;
  readonly keywords?: string[];
}

export const SEO = ({ title, description, keywords = [] }: ISEOProps) => (
  <Helmet
    htmlAttributes={{ lang: "en" }}
    title="Akira"
    titleTemplate={`${title} - %s`}
    meta={[
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:creator",
        content: "Daniell Wijdenbosch",
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
    ].concat(
      keywords.length > 0
        ? {
            name: "keywords",
            content: keywords.join(`, `),
          }
        : []
    )}
  />
);
