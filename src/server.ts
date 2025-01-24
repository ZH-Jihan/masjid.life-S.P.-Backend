import app from './app';
import config from './config';
import dbConnection from './db';

dbConnection()
  .then(() => {
    app.listen(config.port || 8000, () => {
      console.log(`⚙️ Server is running at port : ${config.port}`);
    });
  })
  .catch(err => {
    console.log('MONGO db connection failed !!! ', err);
  });
