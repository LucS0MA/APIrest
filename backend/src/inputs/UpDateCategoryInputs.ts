import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class UpDateCategoryInputs implements Partial<Category> {
  @Field()
  id: number;

  @Field()
  title: string;
}

export default UpDateCategoryInputs;
