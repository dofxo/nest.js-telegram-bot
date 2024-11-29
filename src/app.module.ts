import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';

@Module({
  imports: [AppModule],
  controllers: [AppController],
  providers: [AppService, TelegramBotService],
})
export class AppModule {}
