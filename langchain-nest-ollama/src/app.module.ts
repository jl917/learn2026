import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { RagModule } from './rag/rag.module';
import { RagWebModule } from './rag-web/rag-web.module';
import { RagMongoModule } from './rag-mongo/rag-mongo.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',
    }),
    ChatModule,
    RagModule,
    RagWebModule,
    RagMongoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
