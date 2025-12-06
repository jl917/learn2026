import { Module } from '@nestjs/common';
import { RagMongoService } from './rag-mongo.service';
import { RagMongoController } from './rag-mongo.controller';

@Module({
  providers: [RagMongoService],
  controllers: [RagMongoController],
})
export class RagMongoModule {}
