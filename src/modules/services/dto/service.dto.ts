import { ZodValidationPipe } from '../../../common/zod-validation-pipe';
import z from 'zod';

export const CreateServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
  ownerId: z.string().uuid(),
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;
export const CreateServicePipe = new ZodValidationPipe(CreateServiceSchema);

const updateServiceSchemas = CreateServiceSchema.omit({
  ownerId: true,
}).partial();

export type UpdateServiceDto = z.infer<typeof updateServiceSchemas>;
export const UpdateServicePipe = new ZodValidationPipe(updateServiceSchemas);
