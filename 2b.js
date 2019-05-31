var express=require('express')
var expressValidator=require('express-validator')
var bodyParser=require('body-parser')
var urlencodedparser=bodyParser.urlencoded({extended : false})

var app=express()
app.use(expressValidator())
console.log("visit localhost:5000 to see output")
app.get('/', function(req, res)
{
	res.sendFile(__dirname+'/'+'2b.html');
});
app.get('/insert', urlencodedparser, function(req, res)
{
	req.checkBody('name','Invalid : Name cannot be empty').isEmpty();
	req.checkBody('surname','Invalid : String type expected').isAlpha();
	req.checkBody('salary','Invalid : Integer expected').isInt();

	var errors=req.validationErrors()
	if(errors)
	{
		console.log("Errors: "+errors);
		res.end(JSON.stringify(errors));
		res.end('\n');
	}
	else
	{
		console.log(JSON.stringify(req.body));
		res.end(JSON.stringify(req.body));
		res.end('\n');
	}
});
app.listen(5000)