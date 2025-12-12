import { createCollection, dropCollection, createMilvusIndex, dropIndex } from "./rag/store/milvus";

async function showHelp() {
  console.log(`Usage: bun run src/script.ts <command> [args]

Commands:
	createCollection                Create the Milvus collection
	dropCollection [name]           Drop collection (default: my_documents)
	createMilvusIndex               Create index for the collection
	dropIndex [collection_name]     Drop index for the given collection (default: my_documents)
	all                             Run createCollection -> createMilvusIndex
	help                            Show this help
`);
}

async function main() {
  const [, , cmd, ...args] = process.argv;

  if (!cmd || cmd === "help") {
    await showHelp();
    return;
  }

  try {
    switch (cmd) {
      case "createCollection":
        await createCollection();
        break;
      case "dropCollection": {
        await dropCollection();
        break;
      }
      case "createMilvusIndex":
        await createMilvusIndex();
        break;
      case "dropIndex": {
        await dropIndex();
        break;
      }
      case "all":
        await createCollection();
        await createMilvusIndex();
        break;
      default:
        console.error("Unknown command:", cmd);
        await showHelp();
        process.exitCode = 2;
    }
  } catch (err) {
    console.error("Error executing command:", err instanceof Error ? err.message : err);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  void main();
}
