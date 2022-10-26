import dotenv from "dotenv";
import App from "./app.js";

import Connection from "./config/database.js";

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:: ${err.message}`);
  console.log("Shutting down the server");
  process.exit(1);
});

dotenv.config({ path: ".env" });

Connection("user", "kashif");
const port = process.env.PORT || 5000;

App.listen(port, () => {
  console.log(`Server running on the Port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err}`);
  console.log("Shutting down Server due unhandled promise rejection");
});
