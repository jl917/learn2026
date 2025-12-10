import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/chroma";

const vectorStore = store(embeddings);

const run = async () => {
  const result = await vectorStore.similaritySearch("자동화", 10);
  for (let i = 0; i < result.length; i++) {
    console.log(i, result[i]?.pageContent);
  }
};

run();
