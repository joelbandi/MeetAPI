//TASKS:
//1. provision a db for storing events ()
//2. make fb access work for graphAPIexplorer scope (done)
//3. make fb access work for Meet scope ()
//4. make the route guide on the page ()
//5. make the front page for this app ()
//6. Error handling and developer proofing ()
//7. SQL injection proofing if needed ()



var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var request = require('superagent');
var meetAPP_ID = 1016247148423251;


app.set('port', (process.env.PORT || 5000));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.get('/fb/:app_scoped_userid/:access_token/:app_scoped_queryid',function(request,response){
	var userid = request.params.app_scoped_userid;
	var token = request.params.access_token;
	var queryid = request.params.app_scoped_queryid;

	var query = "https://graph.facebook.com/"+queryid;
	var request = require('superagent');
	request
		.get(query)
		.query({fields: 'context.fields(mutual_likes)'})
		.query({access_token: token})
		.end(function(err,res){
			if(!err && res.status===200){
				console.log('success');
				var res = res.text;
				response.send(res.context.mutual_likes);
			}
		});
});




//TO:DO
//our app is different: we dont remember friends rather we remember events or connections.
//every meeting (read: an event ) between two people will carry an id
//This id is same as the facebook user-context-id between two people 
//which when queried contains all the information pertaining to the two people
//we will maintain our database with information with this user-context-id as the key.
app.get('fb/event/:edgeid/:access_token',function(request,response){
	response.send('event search...coming soon');
});


//TO:DO
//app route info
app.get('/info',function(request,response){
	response.send('info about routes...coming soon');
});





//test routes begin
app.get('/times', function(request,response){
 var string = '';
 for(var i = 0; i<= process.env.TIMES; i++){
    string += i + ' ';
  }
 response.send(string);
});


app.get('/cool',function(request,response){
  response.send(cool());
});
//test routes end

app.listen(app.get('port'), function() {
  console.log('Meet sServer is running on port', app.get('port'));
});


