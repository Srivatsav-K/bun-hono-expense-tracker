import type { ApiRoutes } from "@server/app";
import { hc } from "hono/client";

export const client = hc<ApiRoutes>("/"); // is "/" as they are on the same origin

export const api = client.api;
