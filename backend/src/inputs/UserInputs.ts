import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
class UserInputs implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

export default UserInputs;
