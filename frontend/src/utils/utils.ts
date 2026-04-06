import { callBackend } from "./apiClient";
import type { User } from "../types/types";

export async function main() {
  try {
    const user = await callBackend<User>("run");
    console.log("User:", user);
    return user.result;
  } catch (err) {
    console.error("Request failed:", err);
  }
}
