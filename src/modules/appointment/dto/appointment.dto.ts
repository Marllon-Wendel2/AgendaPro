import { ZodValidationPipe } from '../../../common/zod-validation-pipe';
import z from 'zod';

export const CreateAppointmentSchema = z.object({
  user: z.string(),
  client: z.number(),
  service: z.string(),
  hour: z.string(),
});

export type CreateAppointmentDto = z.infer<typeof CreateAppointmentSchema>;
export const CreateAppointmentPipe = new ZodValidationPipe(
  CreateAppointmentSchema,
);

const updateAppointmenSchema = CreateAppointmentSchema.partial();

export type UpdateAppointmentDto = z.infer<typeof updateAppointmenSchema>;
export const UpdateAppointmentPipe = new ZodValidationPipe(
  updateAppointmenSchema,
);
