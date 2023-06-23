const express = require('express')
const cors = require("cors");
const morgan = require('morgan')
const dotenv = require('dotenv')

const userRoutes = require('./Routes/userRoutes')
const apiRoutes = require('./Routes/apiRoutes')
const port = process.env.PORT

dotenv.config();
const app = express();



app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', apiRoutes);
app.use('/', userRoutes)

app.listen(port, () => {
    console.log("Your server is running on port " + port);
  });
