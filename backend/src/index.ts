import "reflect-metadata";
import { dataSourceGoodCorner } from "./config/db";
import express from "express";
import { Like } from "typeorm";
import { Ads } from "./entities/Ads";
import { Category } from "./entities/Category";
import { validate } from "class-validator";

const app = express();
const port = 3000;

app.use(express.json());

/* ADS ROUTES */

app.get("/ads", async (req, res) => {
  const categoryFilter = req.query.category || "";
  const ads = await Ads.find({
    relations: ["category"],
    where: {
      category: {
        title: Like(`%${categoryFilter}`),
      }
    }
  });
  res.send(ads);
});
  

app.post("/ads", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Ads();
  adToSave.category = req.body.category ? req.body.category: 6;
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

app.delete("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Ads.delete({id});
    res.send("The ad was deleted");
  } catch(err) {
    console.log(err);
    res.status(400).send("an error has occured")
  }
});


app.put("/ads/:id", async (req, res) => {
  try {
    let AdToUpdate = await Ads.findOneByOrFail({id: parseInt(req.params.id)});
    AdToUpdate = Object.assign(AdToUpdate, req.body);
    const result = await AdToUpdate.save();
    console.log(result)
    res.send("Ad has been updated")
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured")
  }
    }
  );

  /* CATEGORY ROUTES */

app.get("/category", async (req, res) => {
  const titleFilter = req.query.title || "";
  const categories = await Category.find({
    where: {
      title: Like(`%${titleFilter}`),
    }
  });
  res.send(categories);
});

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

app.delete("/category/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Category.delete({id});
    res.send("The category was deleted");
  } catch(err) {
    console.log(err);
    res.status(400).send("an error has occured")
  }
});

app.put("/category/:id", async (req, res) => {
  try {
    let CatToUpdate = await Category.findOneByOrFail({id: parseInt(req.params.id)});
    CatToUpdate = Object.assign(CatToUpdate, req.body);
    const result = await CatToUpdate.save();
    console.log(result)
    res.send("Category has been updated")
  } catch (err) {
    console.log(err);
    res.status(400).send("an error has occured")
  }
    }
  );



app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});

