import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

export const mailSchemas = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
});

export type CreateMailDto = z.infer<typeof mailSchemas>;
export const CreateMailPipe = new ZodValidationPipe(mailSchemas);
