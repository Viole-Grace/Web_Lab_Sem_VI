var express=require('express')
var app=express()
var count=0;

console.log("Visit localhost:5000 to see output")

var logger= function(req, res, next)
{
	req.count=count++
	next()
};

var visited= function(req, res, next)
{
	console.log("Visited - "+req.count)
	next()
};

app.use(logger)
app.use(visited)

app.get('/', function(req, res)
{
	if(req.count==0)
	{
		res.end("First Log in\nVisit Count = 0")
	}
	else
		res.end("Number of times this page was Visited : "+req.count)
});

app.listen(5000)