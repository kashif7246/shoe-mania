import express, { application } from "express";
import middleWare from "./middleWare/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

//Route imports
app.use(express.json());

app.use(cookieParser());

import product from "./routes/productRoute.js";
import User from "./routes/userRoute.js";
import Order from "./routes/orderRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}

app.use("/api", product);
app.use("/api", User);
app.use("/api", Order);

app.use(express.static("PRODUCT_FILES"));
// app.use("PRODUCT_FILES",express.static("PRODUCT_FILES"))

// app.use(express.static(path.join(__dirname, "../shoe_minnia_frontend/build")));
app.use(express.static(path.join(__dirname, "../shoe_minnia_frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../shoe_minnia_frontend/build/index.html")
  );
});

//middle ware for error
app.use(middleWare);

export default app;
