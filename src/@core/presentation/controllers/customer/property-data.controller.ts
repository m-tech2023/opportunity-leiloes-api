import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { UpdatePropertyDataUsecase } from '../../../application/use-cases/customer/property-data/update-property.usecase';
import { Controller, Res, Put, Get, UseGuards, Body } from '@nestjs/common';
import { Response } from 'express';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';
import { GetPropertyDataUsecase } from 'src/@core/application/use-cases/customer/property-data/get-property.usecase';

@Controller('account')
export class PropertyDataController {
  constructor(
    private readonly getPropertyDataUsecase: GetPropertyDataUsecase,
    private readonly updatePropertyDataUsecase: UpdatePropertyDataUsecase,
  ) {}

  @Put('property')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Update property data of the authenticated user' })
  @ApiBearerAuth()
  @ApiTags('Account')
  @ApiBody({ type: PropertyDataDto })
  async update(
    @Body() propertyDataDto: PropertyDataDto,
    @User() { _id },
    @Res() res: Response,
  ) {
    try {
      await this.updatePropertyDataUsecase.execute(_id, propertyDataDto);
      return res.status(HttpStatus.OK).json({
        message: 'Property data updated successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Get('property')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Get property data of the authenticated user' })
  @ApiBearerAuth()
  @ApiTags('Account')
  @ApiBody({ type: PropertyDataDto })
  async index(@User() { _id }, @Res() res: Response) {
    try {
      const property = await this.getPropertyDataUsecase.execute(_id);
      return res.status(HttpStatus.OK).json({ data: property });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
