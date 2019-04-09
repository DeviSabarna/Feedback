var express=require('express');
var app=express();
app.set('view engine','ejs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
var bodyParser=require('body-parser');
var path=require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static('./public/images'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/outline.html");
   });
   app.get("/course", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        const dbo = db.db("feedback");
        dbo.collection("course").find({}).toArray(function(err, Result) {
          //var Result=dbo.course.distinct("name");
          //console.log(dbo.course.distinct("name"));
          const distinctNames=[...new Set(Result.map(x=>x.name))];
          var count=distinctNames.length;
          res.render('coursepage',{feedback:count});
      });
        });
    
    });
  app.post("/search",(req,res)=>{
    var search_name=req.body;
    MongoClient.connect(url, function(err, db) {
      const dbo = db.db("feedback");
      dbo.collection("course").find({}).toArray(function(err, Result) {
          res.render('report',{feedback:Result,search:search_name.searchfor});
          });

  });
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
  });
