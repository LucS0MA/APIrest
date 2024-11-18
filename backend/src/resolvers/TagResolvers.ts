import { Ad } from "../entities/Ad";
import { Arg, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";

@Resolver(Ad)
class TagResolvers {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find({
      order: {
        id: "DESC",
      },
    });
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    const tag = await Tag.findOneByOrFail({ id: id });
    return tag;
  }
}

export default TagResolvers;
