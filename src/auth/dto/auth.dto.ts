import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

const AuthSchemas = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  senha: z.string(),
});

export type AuthDto = z.infer<typeof AuthSchemas>;
export const AuthPipe = new ZodValidationPipe(AuthSchemas);
