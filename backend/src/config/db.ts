import { Ads } from "../entities/Ads";
import { DataSource } from "typeorm";

export const dataSourceGoodCorner = new DataSource({
  database: "good_corner.sqlite",
  type: "sqlite",
  entities: [Ads],
  synchronize: true,
  logging: ["error", "query"],
});