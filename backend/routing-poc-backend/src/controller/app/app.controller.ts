import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(200)
  public health(): {status:string} {
    return {status:"Healthy"}
  }
}
