const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const userRouter = require("./Routes/userRouter");
const order=require('./Routes/Orders.js')
const ordersaddress=require('./Routes/ordersaddress.js')
const zakaz=require('./Routes/Zakaz.js')
const points=require('./Routes/points.js')


const fileUpload = require("express-fileupload");

app.use(cors())
app.use(express.static('./media'))
app.use(fileUpload())
app.use(bodyParser.json());
app.use('/auth',userRouter)
app.use('/api',order)
app.use('/api',ordersaddress)
app.use('/api',zakaz)
app.use('/api',points)



app.listen(5000, () => {
    console.log("Localhost is Running");
})