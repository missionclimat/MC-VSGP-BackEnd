const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then((self) => {
    console.log(`Connected to the Database: ${self.connection.name}`);
  })
  .catch((err) => {
    console.log(err);
  });
