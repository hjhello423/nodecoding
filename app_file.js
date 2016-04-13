var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true

app.get('/topic/new', function(req, res){
	fs.readdir('data', function(err, files){// data폴더의 파일을 files에 배열로 저장
		if(err){
			console.log(err);
			res.status(500).send('500 error!!!');
		}
		res.render('new', {titleList:files});
	});
});

app.post('/topic', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/'+title, description, function(err){//data/title로 파일 쓰기 data=description
 		if(err){//error발생시
			res.status(500).send('500 error!!!');//상태코드 500지정
		}
		res.redirect('/topic/'+title);//성공하면 리다이렉트
	});
});

app.get(['/topic', '/topic/:title'], function(req, res){//2가지의 url을 가짐
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('500 error!!!');
		}
		var title = req.params.title;
		if(title){//title값 있을때
			fs.readFile('data/'+title, 'utf8', function(err, data){
				if(err){
					console.log(err);
					res.status(500).send('500 error!!!');
				}
				res.render('view', {title:title, titleList:files, description:data});
			});
		} else{
		res.render('view', {titleList:files, title:'welcome', description:'hello'});
		}
	});
});

// app.get('/topic/:title', function(req, res){
// 	var title = req.params.title;

// 	fs.readdir('data', function(err, files){
// 		if(err){
// 			console.log(err);
// 			res.status(500).send('500 error!!!');
// 		}
// 		fs.readFile('data/'+title, 'utf8', function(err, data){
// 			if(err){
// 				console.log(err);
// 				res.status(500).send('500 error!!!');
// 			}
// 			res.render('view', {title:title, titles:files, description:data});
// 		});
// 	});
// });

app.listen(3000, function(){
	console.log('connected 3000 port');
});