import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
@Injectable()
export class OwnersService {

  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>){}

  create(createOwnerInput: CreateOwnerInput) {
    return this.ownerRepository.save(this.ownerRepository.create(createOwnerInput)) 
  }

  findAll() {
    return `This action returns all owners`;
  }

  findOne(id: number) {
    return this.ownerRepository.findOneBy({id});
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
