import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs-extra";
import bodyParser from "body-parser";
import { ulid } from "ulid";
import { matchSorter } from "match-sorter";

const app = express();
const port = 3001;
const regUrl = "/api";
const imgUrl = "/img";

const COUNTRIES_JSON_PATH = "./data/json/countries.json";

app.use(cors());
app.use(bodyParser.json());
app.use(imgUrl, express.static("data/img"));

/** 
 * The most useful API methods:
 GET /countries
 GET /countries/{id}
 POST /countries
 PUT /countries/{id}
 PATCH /countries/{id}
 DELETE /countries/{id}
 */

// Countries methods
app.get(regUrl + "/countries", (req: Request, res: Response) => {
  let countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  const query = Object(req.query);
  if (Object.keys(query).length !== 0) {
    countries = matchSorter(countries, query.query, {
      keys: ["name"],
    });
  }
  res.status(200).send(countries);
});

app.get(regUrl + "/countries/:id", (req: Request, res: Response) => {
  const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  const country = countries.find(
    (country: { id: string }) => country.id === req.params.id
  );
  res.status(200).send(country ?? null);
});

app.post(regUrl + "/countries/create", (req: Request, res: Response) => {
  const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  const newCountry = {
    id: ulid(),
    ...req.body,
  };
  countries.push(newCountry);
  fs.writeJSONSync(COUNTRIES_JSON_PATH, countries);
  console.log("JSON data saved to file successfully.");
  res.status(200).send(newCountry);
});

app.put(regUrl + "/countries/:id/update", (req: Request, res: Response) => {
  const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  const country = countries.find(
    (country: { id: string }) => country.id === req.params.id
  );
  if (!country) throw new Error("No contact found for " + req.params.id);
  Object.assign(country, req.body);
  fs.writeJSONSync(COUNTRIES_JSON_PATH, countries);
  console.log("JSON data saved to file successfully.");
  res.status(200).send(country);
});

app.delete(regUrl + "/countries/:id/destroy", (req: Request, res: Response) => {
  const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  const index = countries.findIndex(
    (country: { id: string }) => country.id === req.params.id
  );
  if (index > -1) {
    countries.splice(index, 1);
  }
  fs.writeJSONSync(COUNTRIES_JSON_PATH, countries);
  console.log("JSON data saved to file successfully.");
  res.status(200).send(true);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
