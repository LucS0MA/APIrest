import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/Picture";
import { Tag } from "../entities/Tag";

@InputType()
class PictureInput {
  @Field()
  url: string;
}

@InputType()
class TagInput {
  @Field()
  id: number;
}

@InputType()
class AdInputs implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field(() => ID)
  category: Category;

  @Field(() => [PictureInput], {nullable: true})
  pictures?: Picture[];

  @Field(() => [TagInput], { nullable: true })
  tag: Tag[];
}

export default AdInputs;
