import { OllamaEmbeddings } from "@langchain/ollama";

export const bgeLarge = new OllamaEmbeddings({
  model: "bge-large:335m",
  baseUrl: "http://localhost:11434",
});
