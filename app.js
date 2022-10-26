import express, { application } from "express";
import middleWare from "./middleWare/error.js";
import cookieParser from "cookie-parser";

const app = express();

//Route imports
app.use(express.json());

app.use(cookieParser());

import product from "./routes/productRoute.js";
import User from "./routes/userRoute.js";
import Order from "./routes/orderRoutes.js"

app.use("/api", product);
app.use("/api", User);
app.use("/api",Order)

//middle ware for error

app.use(middleWare);

export default app;
