const mongoose = require('mongoose');

//esquema en mongo
const messageEsquema = new mongoose.Schema (
  {
    user:{type:String,required:true},
    body:{type:String,required:true}
  },
  { strict: false }
);

module.exports = Message = mongoose.model('messages',messageEsquema);
