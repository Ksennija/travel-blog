import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello World! I'm JSON", type: 'dfsf' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
