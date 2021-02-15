const mongoose = require('mongoose');
app =require('./config/express');
config=require('./config/env');

mongoose.connect(config.db ,{ useNewUrlParser: true ,useFindAndModify: false, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.db}`);
});

app.listen(3000, () => {
  console.log(`API Server started and listening on port ${config.port} (${config.env})`);
});

module.exports=app;