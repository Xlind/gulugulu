var mongoose = require ('mongoose')
var Schema = mongoose.Schema
// 连接数据库
mongoose.connect('mongodb://localhost/gulugulu')

var userSchema = new Schema({
     username : {type:String,required:true},
     email : {type:String,required:true},
     pw1 : {type:String,required:true},
     created_time : {type:Date,default:Date.now},
     last_modified_time : {type:Date,default:Date.now},
     avatar:{type:String,default:'./public/images/系统头像3.png'},
     status:{type:Number,enum:[0,1,2],default:0}
})

module.exports = mongoose.model('User',userSchema)