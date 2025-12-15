import express from "express";
import cartRoute from "./cart/cart.route";
import { errorHandler } from "./middlewares/error-handler";
import { notFound } from "./middlewares/not-found";

const app = express();

app.use(express.json());

app.use("/cart", cartRoute);

app.use(notFound);

app.use(errorHandler);

export default app;
