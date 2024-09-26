import "reflect-metadata";
import { dataSourceGoodCorner } from "./config/db";
import express from "express";
import { Ads } from "./entities/Ads";
import { validate } from "class-validator";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/ads", async (_req, res) => {
  const ads = await Ads.find();
  res.send(ads);
});
  

app.post("/ads", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Ads();
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


app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});