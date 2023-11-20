import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ManagerController } from 'src/@core/presentation/controllers/manager/manager.controller';
import { ManagerService } from 'src/@core/application/services/manager/manager.service';
import { FindCustomerByIdUseCase } from 'src/@core/application/use-cases/customer/find-by-id.usecase';
import { CustomerService } from 'src/@core/application/services/customer/customer.service';
import { CustomerRepository } from 'src/@core/infra/databases/mongodb/repositories/customer/customer.repository';
import Customer from 'src/@core/infra/databases/mongodb/schemas/customer/customer.schema';
import { RestrictUserInTheAuctionUsecase } from 'src/@core/application/use-cases/manager/restrict-user-in-the-auction.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: Customer,
      },
    ]),
  ],
  controllers: [ManagerController],

  providers: [
    CustomerRepository,
    {
      provide: RestrictUserInTheAuctionUsecase,
      useFactory: (customerRepository: CustomerRepository) => {
        return new RestrictUserInTheAuctionUsecase(
          new ManagerService(customerRepository),
        );
      },
      inject: [CustomerRepository],
    },
    {
      provide: FindCustomerByIdUseCase,
      useFactory: (customerRepository: CustomerRepository) => {
        return new FindCustomerByIdUseCase(
          new CustomerService(customerRepository),
        );
      },
      inject: [CustomerRepository],
    },
  ],
})
export class ManagerModule {}
