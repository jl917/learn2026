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
curl -sS -X POST http://localhost:3000/rag-web   -H "Content-Type: application/json"   -d '{"question":"HTML이란"}'
```

rag-web Streaming test:

```bash
curl -N -X POST http://localhost:3000/rag-web/stream   -H "Content-Type: application/json"   -d '{"question":"List three feature flag tips."}'
```

rag-mongo test

```bash
## 8.2버전 부터 지원이 가능한데 npm에 mongodb 패키지가 7.0까지 지원
curl -sS -X POST http://localhost:3000/rag-mongo   -H "Content-Type: application/json"   -d '{"question":"HTML이란"}'
```

### chroma설치

```sh
docker run -d --rm --name chromadb -p 8000:8000 -v ./chroma:/chroma/chroma -e IS_PERSISTENT=TRUE -e ANONYMIZED_TELEMETRY=TRUE chromadb/chroma:0.6.2
```

### mongodb설치

```sh
## docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
docker run -p 27017:27017 --name mongodb8.2 mongodb/mongodb-community-server:8.2-ubi8
```

### REF

- https://www.markcallen.com/building-a-local-chatbot-with-typescript-express-langchain-and-ollama-qwen/
