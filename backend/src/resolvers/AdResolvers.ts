import AdInputs from "../inputs/AdInputs";
import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpDateAdInputs from "../inputs/UpDateAdInputs";
import { ILike } from "typeorm";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({
      order: {
        id: "DESC",
        pictures: {
          id: "DESC",
        }
      },
    });
    return ads;
  }

  @Query(() => [Ad])
  async getAdsByKeyword(@Arg("adTitle") adTitle: string) {
    const adsByadTitle = await Ad.find({
      where: {
        title: ILike(`%${adTitle}%`),
      },
    });
    return adsByadTitle;
  }

  @Query(() => [Ad])
  async getAdsByCategory(@Arg("categoryTitle") categoryTitle: string) {
    const adsByCategory = await Ad.find({
      where: {
        category: {
          title: categoryTitle
        },
      },
    });
    return adsByCategory;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOne({ where: {id: id }, order: { pictures: {id:"DESC"}}});
    if (ad === null) {
      throw new Error("Cannot find ad with id " + id)
    }
    return ad;
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInputs) {
    const newAdToSave = Ad.create({ ...newAdData});
    const result = await newAdToSave.save();
    const AdAfterSave = await Ad.findOneByOrFail({ id: result.id });
    return AdAfterSave;
  }

  @Mutation(() => String)
  async updateAd(@Arg("data") updateAdData: UpDateAdInputs) {
    let adToUpdate = await Ad.findOneByOrFail({ id: updateAdData.id });
    console.log("ad to update", adToUpdate);
    adToUpdate = Object.assign(adToUpdate, updateAdData);
    console.log("ad to update", adToUpdate);
    const result = await adToUpdate.save();
    console.log(result);
    return "Ad has been updated";
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    const result = await Ad.delete(id);
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "Ad has been deleted";
    } else {
      throw new Error("Ad has not been found");
    }
  }
}

export default AdResolver;
