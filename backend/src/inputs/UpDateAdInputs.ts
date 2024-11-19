import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/Picture";
import { Tag } from "../entities/Tag";

@InputType()
class PictureUpdateInput {
  @Field()
  url: string;
}

@InputType()
class TagUpdateInput {
  @Field()
  id: number;
}


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

  @Field(() => [PictureUpdateInput], {nullable: true})
  pictures?: Picture[];

  @Field(() => ID, { nullable: true })
  category?: Category;

  @Field(() => [TagUpdateInput], { nullable: true })
  tag: Tag[];
}

export default UpDateAdInputs;
