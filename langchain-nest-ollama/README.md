## run

Basic test

```bash
curl -sS -X POST http://localhost:3000/chat   -H "Content-Type: application/json"   -d '{"question":"Give me one CI/CD best practice."}'
```

Streaming test:

```bash
curl -N -X POST http://localhost:3000/chat/stream   -H "Content-Type: application/json"   -d '{"question":"List three feature flag tips."}'
```

rag test

```bash
curl -sS -X POST http://localhost:3000/rag   -H "Content-Type: application/json"   -d '{"question":"Give me one CI/CD best practice."}'
```

rag Streaming test:

```bash
curl -N -X POST http://localhost:3000/rag/stream   -H "Content-Type: application/json"   -d '{"question":"List three feature flag tips."}'
```

rag-web test

```bash
curl -sS -X POST http://localhost:3000/rag-web   -H "Content-Type: application/json"   -d '{"question":"Give me one CI/CD best practice."}'
```

rag-web Streaming test:

```bash
curl -N -X POST http://localhost:3000/rag-web/stream   -H "Content-Type: application/json"   -d '{"question":"List three feature flag tips."}'
```

### chroma설치

```sh
docker run -d --rm --name chromadb -p 8000:8000 -v ./chroma:/chroma/chroma -e IS_PERSISTENT=TRUE -e ANONYMIZED_TELEMETRY=TRUE chromadb/chroma:0.6.2
```

### REF

- https://www.markcallen.com/building-a-local-chatbot-with-typescript-express-langchain-and-ollama-qwen/
