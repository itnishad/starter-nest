import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parseValue = this.schema.parse(value);
      return parseValue;
    } catch (error) {
      throw new BadRequestException('validation failed');
    }
  }
}
