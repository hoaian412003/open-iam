export type Client = {
  image?: string;
  scope: string;
  client_id: string;
  client_secret: string;
  grant_types: string[];
  redirect_uris: string[];
  response_types: string[];
};
