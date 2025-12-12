import { Milvus } from "@langchain/community/vectorstores/milvus";
import type { OllamaEmbeddings } from "@langchain/ollama";
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const milvus = new MilvusClient({ address: (process.env.MILVUS_ADDRESS as string) || "localhost:19530" });

const collectionName = "my_documents";
const vectorField = "embedding";

export const store = (embeddings: OllamaEmbeddings) => {
  return new Milvus(embeddings, {
    collectionName,
    url: process.env.MILVUS_ADDRESS, // 로컬 경로
    primaryField: "id",
    vectorField,
    textField: "pageContent",
  });
};

export async function createMilvusIndex() {
  try {
    console.log("🔍 Creating index for collection:", collectionName);

    // 1) 인덱스 생성
    const indexRes = await milvus.createIndex({
      collection_name: collectionName,
      field_name: vectorField,
      // index_name: "embedding_idx",
      index_type: "IVF_FLAT",
      metric_type: "L2",
      params: { nlist: 1024 },
    });
    console.log("📦 Index created:", indexRes);

    // 2) 컬렉션 로드
    const loadRes = await milvus.loadCollection({
      collection_name: collectionName,
    });
    console.log("🚀 Collection loaded:", loadRes);

    console.log("🎉 Milvus index successfully created & collection loaded!");
  } catch (err) {
    console.error("❗ Index creation error:", err);
  }
}

export async function dropIndex(collection_name: string = collectionName) {
  await milvus.dropIndex({
    collection_name,
    field_name: vectorField,
  });
}

export async function createCollection() {
  await milvus.createCollection({
    collection_name: collectionName,
    fields: [
      {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
      },
      {
        name: "pageContent",
        data_type: DataType.VarChar,
        max_length: 8192, // <-- ★ 여기서 길이 늘려 오류 해결
      },
      {
        name: "embedding",
        data_type: DataType.FloatVector,
        dim: 1024,
      },
      {
        name: "metadata",
        data_type: DataType.VarChar,
        max_length: 32768, // metadata JSON을 담기 위해 충분히 크게
      },
    ],
  });

  console.log("Milvus collection created");
}

export async function dropCollection(collection_name: string = collectionName) {
  await milvus.dropCollection({
    collection_name,
  });
}
