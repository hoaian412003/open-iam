export const Scopes: Record<
  string,
  { details: string; claims: Array<string> }
> = {
  profile: {
    details: "Access to basic profile information.",
    claims: ["name", "avatar"],
  },
  email: {
    details: "Access to the user’s email address.",
    claims: ["email"],
  },
  address: {
    details: "Access to the user’s physical address.",
    claims: ["address"],
  },
  phone: {
    details: "Access to the user’s phone number.",
    claims: ["phone"],
  },
  offline_acess: {
    details: "Allows getting a refresh token (for long-term access).",
    claims: ["refresh_token"],
  },
  policy: {
    details: "Access to the user’s role and permission.",
    claims: ["roles", "permissions"],
  },
};

export const SupportedScopes = Object.keys(Scopes);
