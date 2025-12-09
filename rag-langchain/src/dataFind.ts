import { nomicEmbedText as embeddings } from "./rag/embedding/ollama/nomicEmbedText";
import { chroma as store } from "./rag/store/chroma";

const vectorStore = store(embeddings);

const run = async () => {
  vectorStore.similaritySearch("岗位");
};

run();
