import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  price: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: 'Price must be a numeric string',
    })
    .transform((val) => BigInt(val)),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {
  constructor(
    public readonly name: string,
    public readonly price: bigint,
  ) {
    super();
  }
}
