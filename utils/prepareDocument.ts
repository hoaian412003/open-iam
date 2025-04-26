export const prepareDocument = (doc: any) => {
  if (!doc) {
    return null;
  }

  const isPayloadJson =
    doc.payload &&
    typeof doc.payload === "object" &&
    !Array.isArray(doc.payload);

  const payload = isPayloadJson ? doc.payload : {};

  return {
    ...payload,
    ...(doc.consumedAt ? { consumed: true } : undefined),
  };
};
