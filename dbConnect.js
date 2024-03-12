const mongoose = require("mongoose");

const URL = 'mongodb+srv://vishnu:vishnu@cluster0.3jm8ryu.mongodb.net/resumeses?retryWrites=true&w=majority';

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB Connection Successfull");
  })
  .catch(error => {
    console.log(error);
  });
