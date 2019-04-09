
var express = require("express"); 
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/questiondata",{ useNewUrlParser: true }).then(
    (res) => {
     console.log("Connected to Database Successfully.")
    }
  ).catch(() => {
    console.log("Connection to database failed.");
  });
var nameSchema = new mongoose.Schema({ 
    question: String
   });
var User = mongoose.model("table1", nameSchema);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
   });   
app.post("/addname", (req, res) => {
    console.log('ENTERING DATABASE');
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });   
   app.listen(3000,function(){
    console.log('Listening on port 3000!');
});
