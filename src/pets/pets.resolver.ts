import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';


@Resolver((of) => Pet)

export class PetsResolver {
  constructor(private readonly petsService: PetsService) { }

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'pets' })
  findAll() {
    return this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.findOne(id);
  }

  @Mutation(() => Pet)
  updatePet(@Args('id') id: number, @Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return this.petsService.update(id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.remove(id);
  }

  @ResolveField(returns => Owner)
  owner(@Parent() pet: Pet) {
    return this.petsService.getOwners(pet.ownerId);
  }
}
