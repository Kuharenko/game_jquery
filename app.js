
var express = require('express');
var pug = require('pug');
var app = require('express')(),
    bodyParser = require('body-parser');
var port = 3000;

var players = [];
var quest = "";
app.use('/', bodyParser.urlencoded({
    extended: true
}));

// Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
app.post('/', function(req, res, next) {
    console.dir(req.body);
    var ss = req.body;
    players = [];
	var s = ''
	for(var i = 0; i<10; i++){
		if(ss['player'+i]==undefined){
			break;
		}else{
			players.push(""+(ss['player'+i]));
		}
	}
	quest = req.body.quest;
	res.redirect('/map');
});
//let server = require('http').createServer(app).listen('3000');

app.listen(process.env.PORT, process.env.IP);

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('node_modules/three'));
app.use(express.static('views/includes'));
app.get('/', function (req, res) {
	res.render('index', { title: 'Welcome'});
});

app.get('/map', function (req, res) {
	res.render('maps', { title: 'Map', GetPlayers: players, quest: quest });
});

app.get('/player', function (req, res) {
	res.render('players', { title: 'Chose Player'});
});

app.get('/onePlayer', function (req, res) {
	res.render('onePlayers', { title: 'One Player Game'});
});

app.get('/score', function (req, res) {
	res.render('scores', { title: 'Playr score'});
});

app.get('/dialogMilioner', function (req, res) {
	res.render('dialogMilioners', { title: 'Milioner'});
});

