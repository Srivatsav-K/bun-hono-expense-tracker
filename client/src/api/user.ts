import { client } from "./client";
import { parseError } from "./utils";

export const getUserInfo = async () => {
  const res = await client.api.auth["user-info"].$get();

  if (!res.ok) {
    throw await parseError(res);
  }

  return res.json();
};
