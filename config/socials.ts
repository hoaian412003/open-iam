export const SupportedSocials = {
  Google: {
    name: "Google",
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    scope: "openid email profile",
    icon: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
    userNameField: "email",
  },
  Github: {
    name: "Github",
    authorizeUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userInfoUrl: "https://api.github.com/user",
    scope: "read:user user:email",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    userNameField: "login",
  },
  Facebook: {
    name: "Facebook",
    authorizeUrl: "https://www.facebook.com/v10.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v10.0/oauth/access_token",
    userInfoUrl: "https://graph.facebook.com/me?fields=id,name,email,picture",
    scope: "email public_profile",
    icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
    userNameField: "name",
  },
  LinkedIn: {
    name: "LinkedIn",
    authorizeUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    userInfoUrl: "https://api.linkedin.com/v2/me",
    scope: "r_liteprofile r_emailaddress",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    userNameField: "localizedFirstName", // or use fullName composed from first + last
  },
  Twitter: {
    name: "Twitter",
    authorizeUrl: "https://twitter.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    userInfoUrl: "https://api.twitter.com/2/users/me",
    scope: "tweet.read users.read offline.access",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    userNameField: "name",
  },
  Apple: {
    name: "Apple",
    authorizeUrl: "https://appleid.apple.com/auth/authorize",
    tokenUrl: "https://appleid.apple.com/auth/token",
    userInfoUrl: "https://appleid.apple.com",
    scope: "name email",
    icon: "https://cdn-icons-png.flaticon.com/512/179/179309.png",
    userNameField: "name", // Must be extracted from ID token (sent once)
  },
  Microsoft: {
    name: "Microsoft",
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    userInfoUrl: "https://graph.microsoft.com/v1.0/me",
    scope: "openid email profile",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    userNameField: "displayName",
  },
  Slack: {
    name: "Slack",
    callbackUrl: "https://yourapp.com/callback/slack",
    authorizeUrl: "https://slack.com/oauth/v2/authorize",
    tokenUrl: "https://slack.com/api/oauth.v2.access",
    userInfoUrl: "https://slack.com/api/users.identity",
    scope: "identity.basic identity.email identity.avatar",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111615.png",
    userNameField: "user.name",
  },
};

export type SupportedSocialKeys = keyof typeof SupportedSocials;
export type SupportedSocial = (typeof SupportedSocials)[SupportedSocialKeys];

export const SupportedSocialList = Object.keys(SupportedSocials).map(
  (k: any) => SupportedSocials[k as SupportedSocialKeys],
);
