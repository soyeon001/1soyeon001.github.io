// npm install mysql -s  (설치)

const mysql = require('mysql');
const db = require('../config/db');

const getList = (page, pagesize, searchkey, result) => {
    const con = mysql.createConnection(db);

    let start = (page - 1) * pagesize;
    let end = pagesize;

    con.connect();
    let sql = "select count(id) as cnt from board_202008012 where (title like ?)";     
    let params = ['%'+searchkey+'%', '%'+searchkey+'%',start, end];
    
    con.query(sql, params,(err, rows)=>{
        con.end();
        if(err) {
            console.log(db);
            console.log('게시판 모델 에러 발생.');
            console.log(err);
            result(null);
        } else {            //정상적으로 실행했을 때
            result(rows[0][0].cnt, rows[1]);
        }
    });
};


const getView= (id, result) => {
    const con = mysql.createConnection(db);

    con.connect();
    let sql = "select id, title, content, viewcount, regdate from board_202008012 where id = ?";
    let params = id;   //id, title 두개일 경우 배열로 맵핑 [id, title];
    
    con.query(sql, params, (err, rows)=>{
        con.end();
        if(err) {
            console.log('게시판 모델 에러 발생.');
            console.log(err);
            result(null);
        } else {            //정상적으로 실행했을 때
            result(rows[0]);
        }
    });
}

const setBoard= (title, content, result) => {
    const con = mysql.createConnection(db);

    con.connect();
    let sql = "insert into board_202008012(title, content) values (?,?)";
    let params = [title, content];   //id, title 두개일 경우 배열로 맵핑 [id, title];
    
    con.query(sql, params, (err, rows)=>{
        con.end();
        if(err) {
            console.log('게시판 모델 에러 발생.');
            console.log(err);
            result(null);
        } else {            //정상적으로 실행했을 때
            result(rows[0]);
        }
    });
}

const getEdit = (title, content, result) => {
    const con = mysql.createConnection(db); 

    con.connect();

    let sql = 'update board_202008012 set title=?, content=? where id = ? ';
    let params = [title, content];

    con.query(sql, params, (err, rows)=>{
        con.end();
        if(err){
            console.log('게시판 모델 에러 발생');
            console.log(err);
            result(null);
        } else
            result(rows[0]);//해당되는 게시글 1개
    });
}
const updateData = (id, title, content, result)=>{
    const con = mysql.createConnection(db);
    
    con.connect();
    let sql = 'update board_202008012 set title=?, content=? where id = ?';
    let params = [title, content,id];

    con.query(sql, params, (err, rows)=>{
        con.end();
        if(err) {
            console.log('boardModel getView Error ');
            console.log(err);
            con.end();
            result(null);
        } else {
            result(rows[0]);
        }
    });
};


module.exports = {
    getList,
    getView,
    setBoard,
    getEdit,
    updateData
}
