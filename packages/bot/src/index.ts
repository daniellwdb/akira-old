import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import glob from "glob";
import Redis from "ioredis";
import passport from "passport";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { router as discordRouter } from "./services/discord/api";
import { AkiraClient } from "./structures/AkiraClient";
import "./structures/Guild";
import { logger } from "./util/logger";
import { loadTranslations } from "./util/translate";

const main = async () => {
  const app = express();
  const redis = new Redis();
  const RedisStore = connectRedis(session);

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", true);
  }

  app.use(
    cors({
      origin: process.env.SERVER_DOMAIN || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: "sess:",
      }),
      name: "aid",
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain:
          process.env.NODE_ENV === "production" ? ".wijdenbos.ch" : "localhost",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      },
    })
  );

  app.use(discordRouter);

  await createConnection({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [__dirname + "/entity/*{.js,.ts}"],
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*{.js,.ts}"],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, client }),
  });

  const client = new AkiraClient({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"],
    partials: ["MESSAGE", "CHANNEL"],
    messageCacheMaxSize: 1000,
  });

  glob(__dirname + "/commands/**/*{.js,.ts}", (_, files) => {
    files.forEach(file => import(file));
  });

  await loadTranslations(__dirname + "/../locale");

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, "localhost", () => {
    logger.info("Express server is listening on port 4000");
  });

  client.login(process.env.TOKEN);
};

main();
