import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

export const CreateClientSchema = z.object({
  name: z.string(),
  phone: z.string(),
  plan: z.string(),
});

export type CreateClientDto = z.infer<typeof CreateClientSchema>;
export const CreateClientPipe = new ZodValidationPipe(CreateClientSchema);

const UpdateClientSchema = CreateClientSchema.partial();

export type UpdateClientDto = z.infer<typeof UpdateClientSchema>;
export const UpdateClientPipe = new ZodValidationPipe(UpdateClientSchema);
