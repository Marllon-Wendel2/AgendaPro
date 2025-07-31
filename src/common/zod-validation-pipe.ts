import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((e) => e.message).join(', ');
        throw new BadRequestException(`Validação falhou: ${messages}`);
      }

      throw new BadRequestException('Erro inesperado na validação.');
    }
  }
}
