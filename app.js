//npm install dontenv -s
require('dotenv').config();
const express = require('express');    //터미널 npm install express -s //(save)
//넌적스사용
const nunjucks = require('nunjucks');
const app = express();

const common = require('./config/common');  // 아래있기 때문에 . 으로 한다 . 위에있을땐 .. 

const indexRouter = require('./routers/indexRouter');
const boardRouter = require('./routers/boardRouter');

//공통 모듈을 여러곳(뷰,모델,컨트롤)사용하기 위해서
app.locals.common = common;
app.set('view engine', 'html');     //확장자 html
nunjucks.configure('views', {      //사용자html화면을 views에 넣음
    express: app,                 //express엔진사용
    watch: true,                 //view가 바뀌는 것은 서버 재기동없이 반영해라
});


//post data 받기 위해서
app.use(express.urlencoded({
    extended: true
}));


app.use('/', indexRouter);
app.use('/board', boardRouter);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use((req, res, next)=>{
    res.status(404).send('Not Found');
});


app.listen(80, ()=>{          //포트80 
    console.log('express 서버 가동 중..');
});