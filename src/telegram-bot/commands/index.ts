import { logUserActivity } from '../logger';
import { botType } from 'src/types';

export const commands = (bot: botType) => {
  return [
    {
      command: '/start',
      description: 'شروع بات',
      handler: (ctx: any) => {
        ctx.reply('سلام! برای اطلاعات بیشتر، /info را وارد کنید.');
        logUserActivity(ctx, '/start', bot);
      },
    },
    {
      command: '/info',
      description: 'اطلاعات در مورد بات',
      handler: (ctx: any) => {
        ctx.reply('فعلا کاری نمیکنه');
        logUserActivity(ctx, '/info', bot);
      },
    },
  ];
};
