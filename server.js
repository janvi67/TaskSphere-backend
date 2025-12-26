import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import seedSuperadmin from "./src/utils/seedSuperadmin.js";

connectDB().then(seedSuperadmin);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server Running on ${PORT}`))

