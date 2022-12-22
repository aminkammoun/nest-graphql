import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SqljsEntityManager } from 'typeorm/entity-manager/SqljsEntityManager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pet } from './pets/entities/pet.entity';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';
import { Owner } from './owners/entities/owner.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      entities: [Pet,Owner],
      synchronize: true
    }),
    GraphQLModule.forRoot({
      driver : ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
