import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from 'src/@core/application/dto/responses/users/user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';

const columns = {
  _id: true,
  name: true,
  lastname: true,
  email: true,
  roleId: true,
  confirmed: true,
  document: true,
  documentName: true,
  createdAt: true,
  deletedAt: true,
};

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly user: Model<UserResponseDto>,
  ) {}

  async getAll() {
    return await this.user.find()
      .select(columns)
      .where({deletedAt: null})
      .exec();
  }

  async findById(id: string) {
    return await this.user
      .findById(id)
      .select(columns)
      .where({deletedAt: null})
      .exec();
  }

  async findByEmail(email: string) {
    return await this.user
      .findOne({
        email,
      })
      .select(columns)
      .where({deletedAt: null})
      .exec();
  }

  async create(data: User) {
    return await this.user.create(data);
  }

  async update(id: string, data: User) {
    return this.user.updateOne({ _id: id, deletedAt: null }, data);
  }

  async destroy(id: string) {
    return this.user.deleteMany({ _id: id, deletedAt: null });
  }
}
