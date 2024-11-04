import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_ISSUER_URL!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_SITE_URL!,
    logoutRedirectURL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL!,
  }
);

export const sessionManager = (c: Context): SessionManager => {
  return {
    async getSessionItem(key: string) {
      return getCookie(c, key);
    },
    async setSessionItem(key: string, value: unknown) {
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true, // transmit over https only
        sameSite: "Lax", // same domain -> Strict, redirects -> Lax
        //TODO Review maxAge: 30 * 60 * 1000, // 30 mins
      };

      if (typeof value === "string") {
        setCookie(c, key, value, cookieOptions);
      } else {
        setCookie(c, key, JSON.stringify(value), cookieOptions);
      }
    },
    async removeSessionItem(key: string) {
      deleteCookie(c, key);
    },
    async destroySession() {
      ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
        deleteCookie(c, key);
      });
    },
  };
};
