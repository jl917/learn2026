import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OllamaEmbeddings } from '@langchain/ollama';
import { MongoClient } from 'mongodb';

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text',
  baseUrl: process.env.OLLAMA_URL,
});

const loader = new CheerioWebBaseLoader(
  'https://jl917.github.io/llms-full.txt',
);

export const docs = (question: string) =>
  loader.load().then(async (doc) => {
    const client = new MongoClient(process.env.MONGODB_URI || '');

    await client.connect();
    const db = client.db('rag_mongo_db');
    const collection = db.collection('rag_mongo_collection');
    const hasCollection =
      (
        await db
          .listCollections(
            {
              name: 'rag_mongo_collection',
            },
            { nameOnly: true },
          )
          .toArray()
      ).length > 0;

    // 컬렉션이 없으면 문서 추가
    if (!hasCollection) {
      const allSplits = await textSplitter.splitDocuments(doc);

      // for (let i = 0; i < allSplits.length; i++) {
      //   console.log((((i + 1) / allSplits.length) * 100).toFixed(2) + '%');

      //   // Embed the document content
      //   const embedding = await embeddings.embedQuery(allSplits[i].pageContent);

      //   // Insert to MongoDB with embedding
      //   await collection.insertOne({
      //     pageContent: allSplits[i].pageContent,
      //     metadata: allSplits[i].metadata,
      //     embedding: embedding,
      //     createdAt: new Date(),
      //   });
      // }
      // console.log('데이터 추가완료');

      const index = {
        name: 'vector_index',
        type: 'vectorSearch',
        definition: {
          fields: [
            {
              type: 'vector',
              path: 'embedding',
              similarity: 'cosine',
              numDimensions: 768, // Replace with the number of dimensions of your embeddings
            },
          ],
        },
      };
      await collection.createSearchIndex(index);
      console.log('인덱싱 추가 완료');
    }

    // Define your Vector Search index

    // Embed the question
    const questionEmbedding = await embeddings.embedQuery(question);

    // Search in MongoDB using vector search aggregation
    const results = await collection
      .aggregate([
        {
          $search: {
            cosmosSearch: {
              vector: questionEmbedding,
              k: 5,
            },
            returnScore: true,
          },
        },
        {
          $project: {
            pageContent: 1,
            metadata: 1,
            embedding: 1,
            similarityScore: { $meta: 'searchScore' },
          },
        },
      ])
      .toArray();

    console.log('Search results:', results);
    return results;
  });
