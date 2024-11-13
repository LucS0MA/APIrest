import AdInput from "../inputs/AdInputs";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({
      order: {
        id: "DESC",
      },
    });
    return ads;
  }

  @Query(() => [Ad])
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({ id: id });
    return ad;
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput) {
    const adToSave = new Ad();
    adToSave.createdAt = newAdData.createdAt;
    adToSave.description = newAdData.description;
    adToSave.location = newAdData.location;
    adToSave.owner = newAdData.owner;
    adToSave.price = newAdData.price;
    adToSave.title = newAdData.title;
    adToSave.category = newAdData.category;

    const result = await adToSave.save();
    const adWithCategory =  await Ad.findOneByOrFail({id: result.id})
    return adWithCategory;
  }

  @Mutation(() => Boolean)
  async deleteAd(@Arg("id") id: number): Promise<boolean> {
    try {
      const ad = await Ad.findOneByOrFail({ id: id });
      if (!ad) {
        throw new Error("Annonce non trouvée");
      }
      await Ad.remove(ad);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default AdResolver;
