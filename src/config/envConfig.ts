export const envConfig = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  GATEWAY_URL: process.env.NEXT_PUBLIC_PINATA_GATEWAY as string,
  CHAT_API: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
};
