import "reflect-metadata";
import { dataSourceGoodCorner } from "./config/db";
import express from "express";
import cors from "cors";
import { Like } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { validate } from "class-validator";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

/* ADS ANNONCES ROUTES */

/* GET   ------------------ */

app.get("/ad", async (_req, res) => {
  let ads: Ad[];
  ads = await Ad.find({ relations: { category: true, tag: true } });
  res.send(ads);
});

app.get("/ad/title", async (req, res) => {
  let ads: Ad[];

  if (req.query.title) {
    ads = await Ad.find({
      relations: ["category", "tag"],
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    ads = await Ad.find({ relations: ["category", "tag"] });
  }

  res.send(ads);
});

app.get("/ad/category", async (req, res) => {
  let ads: Ad[];

  if (req.query.category) {
    ads = await Ad.find({
      relations: ["category", "tag"],
      where: {
        category: {
          title: req.query.category as string,
        },
      },
    });
  } else {
    ads = await Ad.find({ relations: ["category", "tag"] });
  }

  res.send(ads);
});

app.get("/ad/tag", async (req, res) => {
  let ads: Ad[];

  if (req.query.tag) {
    ads = await Ad.find({
      relations: ["category", "tag"],
      where: {
        tag: {
          title: req.query.tag as string,
        },
      },
    });
  } else {
    ads = await Ad.find({ relations: ["category", "tag"] });
  }

  res.send(ads);
});

app.get("/ad/:id", async (req, res) => {
  try {
    const result = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* POST   ------------------ */

app.post("/ad", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Ad();
  if (req.body.tag) {
    adToSave.tag = req.body.tag;
  }
  adToSave.category = req.body.category ? req.body.category : 6;
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  adToSave.picture = req.body.picture;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;

  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
});

/* DELETE   ------------------ */

app.delete("/ad/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Ad.delete({ id });
    res.send("The ad was deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* PUT   ------------------ */

app.put("/ad/:id", async (req, res) => {
  try {
    let AdToUpdate = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    AdToUpdate = Object.assign(AdToUpdate, req.body);
    const result = await AdToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* CATEGORY CATEGORIES ROUTES */

/* GET   ------------------ */

app.get("/category", async (req, res) => {
  let categories: Category[];
  if (req.query.title) {
    categories = await Category.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

/* POST   ------------------ */

app.post("/category", async (req, res) => {
  console.log("request body", req.body);
  const catToSave = new Category();
  catToSave.title = req.body.title;

  const errors = await validate(catToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await catToSave.save();
    res.send(result);
  }
});

/* DELETE   ------------------ */

app.delete("/category/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Category.delete({ id });
    res.send("The category was deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* PUT   ------------------ */

app.put("/category/:id", async (req, res) => {
  try {
    let CatToUpdate = await Category.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    CatToUpdate = Object.assign(CatToUpdate, req.body);
    const result = await CatToUpdate.save();
    console.log(result);
    res.send("Category has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* TAG  ETIQUETTES ROUTES */

/* GET   ------------------ */

app.get("/tag", async (req, res) => {
  let tags: Tag[];
  if (req.query.title) {
    tags = await Tag.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    tags = await Tag.find();
  }
  res.send(tags);
});

/* POST   ------------------ */

app.post("/tag", async (req, res) => {
  console.log("request body", req.body);
  const tagToSave = new Tag();
  tagToSave.title = req.body.title;

  const errors = await validate(tagToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await tagToSave.save();
    res.send(result);
  }
});

/* DELETE   ------------------ */

app.delete("/tag/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Tag.delete({ id });
    res.send("The Tag was deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* PUT   ------------------ */

app.put("/tag/:id", async (req, res) => {
  try {
    let TagToUpdate = await Tag.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    TagToUpdate = Object.assign(TagToUpdate, req.body);
    const result = await TagToUpdate.save();
    console.log(result);
    res.send("Tag has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured");
  }
});

/* LISTEN PORT */

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
