import chalk from 'chalk';
import { botType } from 'src/types';
import { createLogger, format, transports } from 'winston';
import 'dotenv/config';
import { convertToPersianDate } from 'src/helpers/converToPersianDate';

const { USER_ID } = process.env;

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: () => {
        return convertToPersianDate(new Date());
      },
    }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'src/telegram-bot/logger/app.log' }),
    new transports.Console(),
  ],
});

export const logUserActivity = async (
  ctx: any,
  message: string,
  bot: botType,
) => {
  const username = ctx.from.username || ctx.from.first_name || 'Unknown User';
  const logMessage = `${username} sent: ${message}`;

  logger.info(logMessage);
  console.log(chalk.blue(logMessage));
  await bot.telegram.sendMessage(USER_ID, logMessage);
};
