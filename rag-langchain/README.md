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
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
```

```sh
## 데이터 DB에 저장
npm run update
```
