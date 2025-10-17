import { ZodValidationPipe } from '../../../common/zod-validation-pipe';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  nome: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),

  email: z.string().email({ message: 'Email inválido' }),

  senha: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message: 'Senha deve conter letras maiúsculas, minúsculas e números',
    }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export const CreateUserPipe = new ZodValidationPipe(CreateUserSchema);

const updateUserSchemas = CreateUserSchema.partial();

export type UpdateUserDto = z.infer<typeof updateUserSchemas>;
export const UpdateUserPipe = new ZodValidationPipe(updateUserSchemas);
