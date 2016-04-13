var express = require('express');//express 모듈을 로드
var app = express();//express 모듈의 리턴값을 app에 저장하고 사용
//app.set('views', './views');//views, 템플리트가 있는 디렉토리
app.set('view engine', 'jade');//view engine, 사용할 템플리트 엔진
app.set('views', './views');//views, 템플리트가 있는 디렉토리
app.locals.pretty = true // jade 코드 자동 정렬

app.use(express.static('public'));

app.get('/template', function(req, res){
	res.render('temp', {time:Date(), _title:'Jade'});
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
