import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database('good_corner.sqlite')

const app = express();
const port = 3000;

app.use(express.json());

  // app.get("/ads", (_req, res) => {
  //   db.all("SELECT * FROM ads", (_err, rows) => {
  //     res.send(rows);
  //   })
  // });

  app.get("/ads", (req, res) => {
 if (req.query.location) {
  db.all(
    "SELECT * FROM ads WHERE location LIKE ?",
    req.query.location,
    (err, rows) => {
      if (err) {
        console.log(err)
      } else {
        res.send(rows)
      }
    }
  )
 } else {
  db.all(
    "SELECT * FROM ads",
    (err, rows) => {
      if (err) {
        console.log(err)
      } else {
        res.send(rows)
      }
    }
  )
 }
  });
  

app.post("/ads", (req, res) => {
  const stmt = db.prepare("INSERT INTO ads (title, description, owner, price, picture, location, createdAT, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );
  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.picture,
    req.body.location,
    req.body.createdAT,
    req.body.category_id
  ])
    res.send("Request received, check the backend terminal");
  });

app.delete("/ads/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM ads where id = ?");
  stmt.run([req.params.id]);
  res.send("The ad was deleted");
});


app.put("/ads/:id", (req, res) => {
  db.get(
    "SELECT * FROM ads WHERE id = ?",
    req.params.id,
    (_err, data: any) => {
      const stmt = db.prepare(
        "UPDATE ads SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, createdAT = ?, category_id = ? WHERE id = ?"
      );
      stmt.run([
        req.body.title ? req.body.title : data.title,
        req.body.description ? req.body.description : data.description,
        req.body.owner ? req.body.owner : data.owner,
        req.body.price ? req.body.price : data.price,
        req.body.picture ? req.body.picture : data.picture,
        req.body.location ? req.body.location : data.location,
        req.body.createdAT ? req.body.createdAT : data.createdAT,
        req.body.category_id ? req.body.category_id : data.category_id,
        req.params.id
      ]);
      res.status(200).send("Ad updated successfully");
    }
  );
});

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
