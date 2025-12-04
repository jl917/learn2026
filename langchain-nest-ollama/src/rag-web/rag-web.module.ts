import { Module } from '@nestjs/common';
import { RagWebService } from './rag-web.service';
import { RagWebController } from './rag-web.controller';

@Module({
  providers: [RagWebService],
  controllers: [RagWebController],
})
export class RagWebModule {}
