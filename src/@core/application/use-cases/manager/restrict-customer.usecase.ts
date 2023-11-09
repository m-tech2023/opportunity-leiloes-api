import { CustomerDto } from '../../dto/requests/customer/customer.dto';
import { ManagerService } from '../../services/manager/manager.service';

export class RestrictCustomerUsecase {
  constructor(private readonly managerService: ManagerService) {}

  async execute(CustomerId: string, updatedData: CustomerDto) {
    return await this.managerService.restrictCustomer(CustomerId, updatedData);
  }
}
