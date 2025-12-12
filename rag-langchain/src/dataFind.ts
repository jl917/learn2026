import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/milvus";

const vectorStore = store(embeddings);

const run = async () => {
  const result = await vectorStore.similaritySearchWithScore("AI 솔루션", 5);
  console.log(result);
  console.log(result[0]?.[0].metadata);
};

run();
