const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const myCors = require('./src/middlewares/cors');
const morgan = require('morgan')
const xss = require('xss-clean')
const mainRouter = require('./src/routes/index.js')

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(xss())
app.use(cors(myCors))
app.use(morgan('dev'))



app.use('/', mainRouter)

  // error handling
app.all("*", (req, res) => {
  res.status(404).json({ status: "error", statusCode: 404 });
});
  
app.use("/", (req, res) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});