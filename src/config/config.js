import * as serviceAccount from './firebaseData.json' assert { type: 'json' };

export default {
  mongoDB: {
    URL: "mongodb+srv://admin:admin@cluster0.7ddl8ks.mongodb.net/ecommerce?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },firebase:{
    serviceAcc : serviceAccount.default
  }
};
