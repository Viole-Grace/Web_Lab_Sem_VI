var express=require('express')
var app=express()
console.log("Visit localhost:5000/4bindex on your browser to see output")
app.get('/4bindex.html', function(req, res)
{
	//res.end("Index Page!");
	console.log("Index Page reached.")
	res.sendFile(__dirname+'/'+'4bindex.html')
});
app.get('/4bhome.html', function(req, res)
{
	console.log("Entered home page.")
	res.sendFile(__dirname+'/'+'4bhome.html')
});
app.get('/4bcontacts.html', function(req, res)
{
	console.log("Entered contacts page.")
	res.sendFile(__dirname+'/'+'4bcontacts.html')
});
app.get('/4bregistration.html', function(req, res)
{
	console.log("Entered registration page.")
	res.sendFile(__dirname+'/'+'4bregistration.html')
});
app.listen(5000)