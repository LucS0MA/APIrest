import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class TagInputs implements Partial<Tag> {
  @Field()
  title: string;
}

export default TagInputs;
