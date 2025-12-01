
## run

Basic test
```bash
curl -sS -X POST http://localhost:3000/chat   -H "Content-Type: application/json"   -d '{"question":"Give me one CI/CD best practice."}'
```

Streaming test:
```bash
curl -N -X POST http://localhost:3000/chat/stream   -H "Content-Type: application/json"   -d '{"question":"List three feature flag tips."}'
```

### REF

- https://www.markcallen.com/building-a-local-chatbot-with-typescript-express-langchain-and-ollama-qwen/
