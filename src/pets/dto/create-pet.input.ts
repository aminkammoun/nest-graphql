import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field((type) => Int, { nullable: true })
  ownerId?: number;
}
