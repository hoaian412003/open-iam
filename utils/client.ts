import { randomBytes } from "crypto";

export function generateClientId(): string {
  return randomBytes(8).toString("hex");
}

export function generateClientSecret(): string {
  return randomBytes(32).toString("hex");
}
