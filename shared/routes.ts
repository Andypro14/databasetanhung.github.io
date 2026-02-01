import { z } from 'zod';
import { citizens, searchSchema } from './schema';

export const api = {
  citizens: {
    list: {
      method: 'GET' as const,
      path: '/api/citizens',
      input: searchSchema,
      responses: {
        200: z.object({
          data: z.array(z.custom<typeof citizens.$inferSelect>()),
          total: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
