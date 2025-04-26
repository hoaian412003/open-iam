export type InteractionPrompt = {
  name: string;
  reason: Array<string>;
  details: Record<string, any>;
};
export type InteractionParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
};
