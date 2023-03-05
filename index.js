const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const xss = require('xss-clean')
const mainRouter = require('./src/routes/index.js')
const cookieParser = require('cookie-parser')

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(xss())
app.use(cors({
  origin: [`http://localhost:3000`, `https://recipppe.netlify.app/`],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(
  helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })
)
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: false,
//   })
// );


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