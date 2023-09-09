const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const dotenv     = require("dotenv");
const apiRouter       = require('./routes/api').router;

const app = express();
dotenv.config()

// var corsOptions = {
//     // origin : `http://${process.env.BACK_HOST}/${process.env.BACK_PORT}/`
//     origin: "http://localhost:8080/"
// }
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/',apiRouter);

app.get('/', (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<p>Karakôry olo jiaby</p>')
});

app.listen(process.env.BACK_PORT, () => {
    console.log(`server running : http://${process.env.BACK_HOST}/${process.env.BACK_PORT}` )
});
