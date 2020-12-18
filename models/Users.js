const mongoose = require('mongoose');

//esquema en mongo
const UserEsquema = new mongoose.Schema (
  {
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['usuario','moderador'],required:true}
  },
  { strict: false }
);

module.exports = User = mongoose.model('users',UserEsquema);
