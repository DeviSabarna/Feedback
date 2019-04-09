
var express=require('express');
var app=express();
app.set('view engine','ejs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser=require('body-parser');
var path=require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/feedback.html");
 }); 
 app.post("/get-data", (req, res) => {
  var resultArray = [];
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("questiondata");
    dbo.collection("table1").find({}).toArray(function(err, employeeResult) {
      res.render('mypage',{question:employeeResult});
  });
    });
  });
  app.post("/add",(req,res)=>{
    console.log(req.body['faculty']);
    console.log(req.body['r1']);
  });
    /*if (err) {
      res.send(err);
  } else if (employeeResult.length) {
    var question=employeeResult.question;
    res.render('mypage',{question:question});
  } else {
      res.send('No documents found');
  }
  db.close();
});
});
 });*/
app.listen(3000,function(){
  console.log('Listening on port 3000!');
});





