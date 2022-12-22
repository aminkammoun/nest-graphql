import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from '../../pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  phone: number;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(type => [Pet],{nullable: true})
  pets?: Pet[];
}
