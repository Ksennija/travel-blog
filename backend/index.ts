import express, { Request, Response } from "express";
import cors from "cors";

const users = [
  {
      "id": 1,
      "fname": "Karn",
      "lname": "Yong",
      "username": "karn.yong@melivecode.com",
      "avatar": "https://www.melivecode.com/users/1.png"
  },
  {
      "id": 2,
      "fname": "Ivy",
      "lname": "Cal",
      "username": "ivy.cal@melivecode.com",
      "avatar": "https://www.melivecode.com/users/2.png"
  },
  {
      "id": 3,
      "fname": "Walter",
      "lname": "Beau",
      "username": "walter.beau@melivecode.com",
      "avatar": "https://www.melivecode.com/users/3.png"
  },
  {
      "id": 4,
      "fname": "Gayla",
      "lname": "Bertrand",
      "username": "gayla.bertrand@melivecode.com",
      "avatar": "https://www.melivecode.com/users/4.png"
  }
];


const app = express();
const port = 3001;

app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.json(users);
  //res.json({ message: "Hello World! I'm JSON", type: 'dfsf' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
