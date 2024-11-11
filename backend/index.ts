import express, { Request, Response } from "express";
import cors from "cors";
import { countries } from "./data/json/countries";
import fs from "fs-extra";
import bodyParser from "body-parser";
import { ulid } from "ulid";

const app = express();
const port = 3001;
const regUrl = "/api";
const imgUrl = "/img";

const COUNTRIES_JSON_PATH = "./data/json/countries.json";

app.use(cors());
app.use(bodyParser.json());
app.use(imgUrl, express.static("data/img"));

app.get(regUrl + "/countries", (req: Request, res: Response) => {
  const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
  res.status(200).send(countries);
});

/**
 GET /countries
 GET /countries/{id}
 POST /countries
 PUT /countries/{id}
 PATCH /countries/{id}
 DELETE /countries/{id}
 */

interface Country {
  id: string;
  name: string;
  description: string;
}

type CreateCountryBody = Omit<Country, "id">;

app.post<string, unknown, Country, CreateCountryBody>(
  regUrl + "/countries/create",
  (req, res) => {
    const countries = fs.readJSONSync(COUNTRIES_JSON_PATH);
    const newCountry = {
      id: ulid(),
      ...req.body,
    };
    countries.push(newCountry);
    fs.writeJSONSync(COUNTRIES_JSON_PATH, countries);
    console.log("JSON data saved to file successfully.");
    res.status(200).send(newCountry);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
