var express = require('express');//express 모듈을 로드
var app = express();//express 모듈의 리턴값을 app에 저장하고 사용
//app.set('views', './views');//views, 템플리트가 있는 디렉토리
app.set('view engine', 'jade');//view engine, 사용할 템플리트 엔진
app.set('views', './views');//views, 템플리트가 있는 디렉토리
app.locals.pretty = true // jade 코드 자동 정렬

app.use(express.static('public'));

app.get('/queryURL3/:id/:mode', function(req, res){
	res.send(req.params.id +', '+ req.params.mode);
});

app.get('/queryURL2/:id', function(req, res){
	var arrLink = [
		'apple',
		'baby',
		'car'
	];
	var output = `
		<a href="/queryURL2/0">apple</a><br>
		<a href="/queryURL2/1">baby</a><br>
		<a href="/queryURL2/2">car</a><br>
		${arrLink[req.params.id]}
	`
	res.send(output);
});

app.get('/queryURL', function(req, res){
	var arrLink = [
		'apple',
		'baby',
		'car'
	];
	var output = `
		<a href="/queryURL?id=0">apple</a><br>
		<a href="/queryURL?id=1">baby</a><br>
		<a href="/queryURL?id=2">car</a><br>
		${arrLink[req.query.id]}
	`
	res.send(output);
});

app.get('/template', function(req, res){
	res.render('temp', {time:Date(), _title:'Jade'});//temp.jade 템플렛 렌더링 
});

app.get('/dynamic', function(req, res){
	var lis ='';
	for(var i =0; i<5; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	var output = `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		Hello Dynamic!
		${lis}
		</br>
		${time}
	</body>
	</html>`;
	res.send(output);
})

app.get('/', function(req, res){//get이 라우터의 역할
	res.send('hello worls');
});

app.get('/login', function(req,res){
	res.send('login please');
});

app.get('/logo', function(req, res){
	res.send('hello logo, <img src="./logo.PNG">');

});

app.listen(3000, function(){
	console.log('conneted 3000 port');
});
