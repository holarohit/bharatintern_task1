const express =require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded ({
  extended:true
}))

mongoose.connect('mongodb://localhost:27017/formdb')
var db=mongoose.connection 
db.on('error',()=>console.log("Error in connecting to database"))
db.once('open',()=> console.log("connected to database"))


app.post("/signup",(req,res)=> { 
  var name = req.body.name
  var password=req.body.password
  var age=req.body.age
  var email=req.body.email
  var phone=req.body.phone
  var gender=req.body.gender
 

  var data={
    "name":name,
    "password":password,
    "age":age,
    "email":email,
    "phone":phone,
    "gender":gender
  }
  db.collection('users').insertOne (data, (err,collection) =>{
    if(err){
      throw err;
    }
    console.log("record successfully")
  })
  return res.redirect('signup_success.html')
})

app.get("/", (req,res) => {
  res.set({
    "allow-access-allow-origin": '*'
  })
  return res.redirect('index.html')
}).listen(4000);

console.log("listen on port 4000")