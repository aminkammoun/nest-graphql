import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { Pet } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from 'src/owners/owners.module';
@Module({
  imports: [TypeOrmModule.forFeature([Pet]),OwnersModule],
  providers: [PetsResolver, PetsService]
})
export class PetsModule {}
