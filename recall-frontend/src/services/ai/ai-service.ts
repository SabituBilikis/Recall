export type AiCapability = "ocr" | "semantic-search" | "summary";

export type AiService = {
  isAvailable(capability: AiCapability): boolean;
};

export const aiService: AiService = {
  isAvailable: () => false
};
