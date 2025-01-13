import UserInputs from "../inputs/UserInputs";
import { User } from "../entities/User";
import * as argon2 from "argon2"
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver(User)
class UserResolvers {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInputs) {
    const result = await User.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
    });
    console.log("result", result);
    return "ok";
  }
}

export default UserResolvers;
