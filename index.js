const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const userRouter = require("./Routes/userRouter");
const fileUpload = require("express-fileupload");
const trekCodeRouter = require("./Routes/trekCodeRouter");
app.use(cors())
app.use(express.static('./media'))
app.use(fileUpload())
app.use(bodyParser.json());
app.use('/auth',userRouter)
app.use('/api',trekCodeRouter)


app.listen(5000, () => {
    console.log("Localhost is Running");
})