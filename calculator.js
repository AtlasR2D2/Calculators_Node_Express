const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"\index.html"));
});

app.post("/",function(req,res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var strOp = req.body.operator;
  res.send("Calculation: "+num1+" "+getOpSymbol(strOp)+" "+num2+" = "+calculator(num1,num2,strOp));
});

app.get("/bmi-calculator", function(req,res){
  res.sendFile(path.join(__dirname,"/bmiCalculator.html"));
});

app.post("/bmi-calculator",function(req,res){
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);
  res.send("BMI Calculation (Height: "+height+"m, weight: "+weight+"kg): "+bmiCalculator(height,weight));
});

const portNum=3000;
app.listen(portNum,function(){
  console.log("Server started on port "+portNum);
});

function add(num1,num2) {
  return num1+num2
}

function subtract(num1,num2) {
  return num1-num2
}

function multiply(num1,num2) {
  return num1*num2
}

function divide(num1,num2) {
  return num1/num2
}

function calculator(num1,num2,strOp) {
  switch (strOp) {
    case "add": return add(num1,num2);break;
    case "subtract": return subtract(num1,num2);break;
    case "multiply": return multiply(num1,num2);break;
    case "divide": return divide(num1,num2);break;
  }
}

function getOpSymbol(strOp) {
  switch (strOp) {
    case "add": return "+";break;
    case "subtract": return "-";break;
    case "multiply": return "x";break;
    case "divide": return "/";break;
  }
}

function bmiCalculator(height,weight) {
  return Math.round(weight / (height**2));
}
