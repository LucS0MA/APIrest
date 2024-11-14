import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class CategoryInputs implements Partial<Category> {
  @Field()
  title: string;
}

export default CategoryInputs;
