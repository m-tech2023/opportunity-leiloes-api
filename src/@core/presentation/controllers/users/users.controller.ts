import { PreSavePersonalDataUsecase } from 'src/@core/application/use-cases/account/pre-save-personal-data.usercase';
import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { CreateUserUseCase } from 'src/@core/application/use-cases/users/create-user.usecase';
import { DestroyUserUseCase } from 'src/@core/application/use-cases/users/destroy-user.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { GetAllUseCase } from 'src/@core/application/use-cases/users/get-all.usecase';
import { UpdateUserUseCase } from 'src/@core/application/use-cases/users/update-user.usecase';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { AccessLogService } from '../../../application/services/access-log/access-log.service';
import { PreSavePersonalDataDto } from 'src/@core/application/dto/requests/account/pre-save-personal-data.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUseCase: GetAllUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly destroyUserUseCase: DestroyUserUseCase,
    private readonly preSavePersonalDataUsecase: PreSavePersonalDataUsecase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list users' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @UseGuards(AuthorizationGuard)
  async index(@Res() res: Response) {
    try {
      const data = await this.getAllUseCase.execute();
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @UseGuards(AuthorizationGuard)
  async show(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.findByIdUseCase.execute(id);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @ApiTags('Users')
  async store(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const userCreated = await this.createUserUseCase.execute(createUserDto);
      const preSavePersonalData: PreSavePersonalDataDto = {
        userId: userCreated._id,
        registrationData: {
          fullName: userCreated.name,
          document: {
            cpf:
              userCreated.documentName == 'CPF' ? userCreated.document : null,
            rg: userCreated.documentName == 'RG' ? userCreated.document : null,
            passport:
              userCreated.documentName == 'passport'
                ? userCreated.document
                : null,
          },
        },
        contactDetails: {
          email: userCreated.email,
        },
      };
      await this.preSavePersonalDataUsecase.execute(preSavePersonalData);

      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.updateUserUseCase.execute(id, updateUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User updated successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Destroy an user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @UseGuards(AuthorizationGuard)
  async destroy(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.destroyUserUseCase.execute(id);
      return res.status(HttpStatus.OK).json({
        message: 'User deleted successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
