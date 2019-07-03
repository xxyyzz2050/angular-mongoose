const mongoose = require("mongoose");

//const auth = "xxyyzz2050:Xx159753%2540%2540";
const auth = "xxyyzz2050:Xx159753%40%40";
const srv = true;

const uri = `mongodb://${auth}@cluster-test-shard-00-00-kuwit.gcp.mongodb.net:27017,cluster-test-shard-00-01-kuwit.gcp.mongodb.net:27017,cluster-test-shard-00-02-kuwit.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-test-shard-0&authSource=admin&retryWrites=true&w=majority`;
const uri_srv = `mongodb+srv://${auth}@cluster-test-kuwit.gcp.mongodb.net/test?retryWrites=true&w=majority`;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  bufferCommands: false,
  autoIndex: false,
  retryWrites: true
};

//without srv
mongoose.connection.close();
mongoose
  .connect(
    srv ? uri_srv : uri,
    options
  )
  .then(db => {
    console.log("connected");
  })
  .catch(err => {
    console.log("err:", err);
  });

//with srv
/*
mongoose.connection.close();
mongoose
  .connect(
    uri_srv,
    options,
  )
  .then(db => {
    console.log("connected-srv");
  })
  .catch(err => {
    console.log("err-srv:", err);
  });
  */
