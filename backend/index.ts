import express, { Request, Response } from "express";
import cors from "cors";
import { countries } from "./data/json/countries"


const app = express();
const domain = "localhost:"
const port = 3001;
const regUrl = "/api";
const imgUrl = "/img";

app.use(cors());
app.use(imgUrl, express.static('data/img'))

app.get(regUrl + "/countries", (req: Request, res: Response) => {
  res.json(countries);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
