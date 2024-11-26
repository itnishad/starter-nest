import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    console.log(metatype);
    return value;
  }
}
