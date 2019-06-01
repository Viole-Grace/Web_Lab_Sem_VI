var express = require('express')
var app = express()


console.log("Please visit localhost:5000/index.html to view output")
app.get('/6bindex.html' , function(req, res)
{
	console.log("Entered index.")
	res.sendFile(__dirname+'/'+'6bindex.html')
});
app.get('/CSE.html' , function(req, res)
{
	console.log("Entered CSE page")
	res.sendFile(__dirname+'/'+'CSE.html')
});
app.get('/ISE.html' , function(req, res)
{
	console.log("Entered ISE page")
	res.sendFile(__dirname+'/'+'ISE.html')
});
app.get('/ECE.html' , function(req, res)
{
	console.log("Entered ECE page")
	res.sendFile(__dirname+'/'+'ECE.html')
});
app.listen(5000)
	