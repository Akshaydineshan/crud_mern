const mongoose =require('mongoose')

const prductSchema= new mongoose.Schema({
    name:{type:String},
    price:{type:String},
    category:{type:String},
    userid:{type:mongoose.Types.ObjectId},
    company:{type:String},

})



module.exports=mongoose.model("Product",prductSchema)