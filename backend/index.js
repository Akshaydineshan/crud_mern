const express =require("express")
const cors =require('cors')
const mongoose =require('mongoose')


const app =express()

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mernecom',{ useNewUrlParser: true}).then(()=>{
console.log("mongo db connected")
}).catch((error)=>{
    console.log("connection failed")
})


const authRoutes =require('./routes/Authroutes')
const mainRoute=require('./routes/MainRoute')

app.use('/api/account',authRoutes)
app.use('/api/main',mainRoute)

app.listen(3001,()=>{
    console.log("create 3001 port");
})