import { OllamaEmbeddings } from "@langchain/ollama";

export const embeddings = new OllamaEmbeddings({
  model: "bge-large:335m",
  baseUrl: "http://localhost:11434",
});
