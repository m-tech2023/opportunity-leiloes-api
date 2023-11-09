import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/@core/application/dto/requests/customer/create-customer.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('customer')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCustomerDto })
  @ApiTags('Customer')
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response,
  ) {
    try {
      await this.createCustomerUseCase.execute(createCustomerDto);

      return res.status(HttpStatus.CREATED).json({
        message: 'Customer created successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
