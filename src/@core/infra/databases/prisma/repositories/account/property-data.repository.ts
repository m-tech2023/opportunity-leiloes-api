import { Injectable } from '@nestjs/common';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { PrismaService } from '../../prisma.service';
@Injectable()
export class PropertyDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    return await this.prisma.studFarm.findFirst({
      where: { userId },
    });
  }

  async update(userId: string, updateProperty: PropertyDataDto) {
    console.log(userId);
    return await this.prisma.studFarm.upsert({
      where: {
        userId,
      },
      update: {
        userId,
        farmName: updateProperty.farmName,
        ...updateProperty.contactDetails,
        ...updateProperty.address,
      },
      create: {
        userId,
        farmName: updateProperty.farmName,
        ...updateProperty.contactDetails,
        ...updateProperty.address,
      },
    });
  }
}
