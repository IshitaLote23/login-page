const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/product")
.then(() =>{
    console.log('Connected');
})
.catch(() =>{
    console.log('Error');
})
const schema = new mongoose.Schema({
   name:{
     type:String,
     require:true
    }
})
const collection = new mongoose.model('pro', schema);
let data = {name:'switzerland'}
collection.insertMany([data])