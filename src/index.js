import dotenv from 'dotenv';
import { app } from './app.js';
import dbConact from './db/index.js';

dotenv.config(
    { path: './.env' } // Assuming your environment variables are stored in a '.env' file in the project root
);
dbConact()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

