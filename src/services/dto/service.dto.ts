import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

export const CreateServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;
export const CreateServicePipe = new ZodValidationPipe(CreateServiceSchema);

const updateServiceSchemas = CreateServiceSchema.partial();

export type UpdateServiceDto = z.infer<typeof updateServiceSchemas>;
export const UpdateServicePipe = new ZodValidationPipe(updateServiceSchemas);
