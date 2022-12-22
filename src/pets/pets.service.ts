import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from '../owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()

export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>,private ownerService: OwnersService) { }
  create(createPetInput: CreatePetInput) {
    return this.petsRepository.save(this.petsRepository.create(createPetInput));
  }

  findAll() {
    return this.petsRepository.find();;
  }

  findOne(id: number) {
    return this.petsRepository.findOneBy({ id });;
  }

  async update(id: number, attrs: Partial<Pet>) {
    
    let pet = await this.findOne(id)
    if (!pet) {
      throw new NotFoundException("no useer to update");
    }
    pet = Object.assign(pet, attrs);
    return this.petsRepository.save(pet)
  }

  async remove(id: number) {
    const pet = await this.findOne(id)
        if (!pet) {
            throw new NotFoundException("no pet to remove");
        }
        return this.petsRepository.remove(pet)
  }

  getOwners(ownerId: number){
    console.log(this.ownerService.findOne(ownerId));
    
    return this.ownerService.findOne(ownerId)
  }
}
