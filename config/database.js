import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@mern-crud.u7bqnw2.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Error while conecting with database", error);
  }
};
export default Connection;
