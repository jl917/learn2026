### bun

```sh
curl -fsSL https://bun.sh/install | bash
```

```
bun add -d @langchain/classic
```


### chroma설치

```sh
docker run -d --rm --name chromadb -p 8000:8000 -v ./chroma:/chroma/chroma -e IS_PERSISTENT=TRUE -e ANONYMIZED_TELEMETRY=TRUE chromadb/chroma:0.6.2
```

### milvus설치

```sh
# docker run -d --name milvus-standalone -p 19530:19530 milvusdb/milvus:latest
```

```sh
## 데이터 DB에 저장
npm run update
```

