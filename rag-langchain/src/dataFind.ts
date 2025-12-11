import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/milvus";

const vectorStore = store(embeddings);

const run = async () => {
  const result = await vectorStore.similaritySearch("돈통 열기");
  console.log(result);
};

run();
