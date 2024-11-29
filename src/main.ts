import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import chalk from 'chalk';
import { convertToPersianDate } from './helpers/converToPersianDate';

const PORT = process.env.PORT || 5500;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT, () =>
    console.log(
      chalk.green(`app is running / ${convertToPersianDate(new Date())}`),
    ),
  );
}
bootstrap();
