import express from "express";
import { router } from "./routes/authRouter.js";

const app = express();

app.use(express.json());
app.use("", router);

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
