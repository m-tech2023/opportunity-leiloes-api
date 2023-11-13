import { Injectable } from '@nestjs/common';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { Document } from '../../use-cases/login/types/document.type';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    // return await this.userRepository.getAll();
  }

  async findById(id: string) {
    // return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async findByDocument(document: string) {
    return await this.userRepository.findUserByDocument(document);
  }

  async create(data: User) {
    return await this.userRepository.create(data);
  }

  async update(id: string, data: User) {
    // return await this.userRepository.update(id, data);
  }

  async deleteById(id: string) {
    // return await this.userRepository.deleteById(id);
  }
}
