import type { UserType } from "@kinde-oss/kinde-typescript-sdk";
import { createMiddleware } from "hono/factory";
import { kindeClient, sessionManager } from "../controllers/kinde";

declare module "hono" {
  interface ContextVariableMap {
    user: UserType;
  }
}

export const getUser = createMiddleware(async (c, next) => {
  try {
    const userProfile = await kindeClient.getUserProfile(sessionManager(c));
    c.set("user", userProfile);
    await next();
  } catch (e) {
    console.log("🚀 ~ e:", e);
    return c.json({ error: "Unauthorised" }, 401);
  }
});
