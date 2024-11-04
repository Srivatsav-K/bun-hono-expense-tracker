import { Hono } from "hono";
import { kindeClient, sessionManager } from "../controllers/kinde";
import { getUser } from "../middleware/authenticateUser";

export const authRouter = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    // gets called after login & register
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("check", async (c) => {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(c)
    );
    return c.json({ isAuthenticated });
  })
  .get("/user-info", getUser, async (c) => {
    const user = c.var.user;
    return c.json(user);
  });
