import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class UpDateAdInputs implements Partial<Ad> {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => [String], {nullable: true})
  picturesUrls?: string[];

  @Field(() => ID, { nullable: true })
  category?: Category;

  @Field(() => ID, { nullable: true })
  tagIds?: number[];
}

export default UpDateAdInputs;
