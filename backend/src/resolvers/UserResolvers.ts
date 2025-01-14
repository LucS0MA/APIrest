import UserInputs from "../inputs/UserInputs";
import { User } from "../entities/User";
import * as argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(User)
class UserResolvers {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInputs) {
    const result = await User.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
    });
    console.log("result", result);
    return "The user was created";
  }

  @Query(() => String)
  async login(@Arg("data") loginUserData: UserInputs) {
    let isPasswordCorrect = false;
    const user = await User.findOneBy({ email: loginUserData.email });
    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.hashedPassword,
        loginUserData.password
      );
    }
    if (isPasswordCorrect === true && user !== null) {
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as Secret
      );
      return token;
    } else {
      throw new Error("Incorrect login");
    }
  }
}

export default UserResolvers;
