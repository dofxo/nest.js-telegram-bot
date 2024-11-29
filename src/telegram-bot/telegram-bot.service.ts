import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { commands } from './commands/';
import { logUserActivity } from './logger';

@Injectable()
export class TelegramBotService {
  private telegramBot: Telegraf;

  constructor() {
    const { TOKEN } = process.env;
    this.telegramBot = new Telegraf(TOKEN);

    // Register commands dynamically
    this.telegramBot.telegram.setMyCommands(
      commands(this.telegramBot).map((cmd) => ({
        command: cmd.command.replace('/', ''),
        description: cmd.description,
      })),
    );

    // Register each command handler
    commands(this.telegramBot).forEach((cmd) => {
      this.telegramBot.command(cmd.command.slice(1), cmd.handler);
    });

    // Log user activity for every message
    this.telegramBot.on('message', (ctx: any) => {
      logUserActivity(ctx, ctx.message.text, this.telegramBot);
    });

    // Launch the bot
    this.telegramBot.launch();
  }
}
