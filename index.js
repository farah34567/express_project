const express= require('express');
require('dotenv').config(); // Import dotenv
const connectDB = require('./database/db');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

connectDB();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});
