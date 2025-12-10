import { OllamaEmbeddings } from "@langchain/ollama";

export const embeddings = new OllamaEmbeddings({
  model: "hf.co/Neuwhufbox/BGE-m3-ko-gguf:latest",
  baseUrl: "http://localhost:11434",
});
