const { response } = require('express');
const model = require('../models/boardModel');
const pagesize = 10;

let list = ((req, res)=>{
    let {page, searchkey} = req.query;
    if (page == undefined) page = 1;
    if (searchkey == undefined) searchkey = '';

    model.getList(page, pagesize, searchkey, (totalcount, listdata)=>{
        let totalpage = parseInt(totalcount/pagesize);
        if(totalcount%pagesize != 0) {
            totalpage++;
        }
        res.render('board/index', {page, totalpage, listdata, searchkey});
    });
});

let view = ((req, res)=>{
    let {id, title} = req.query;

    model.getView(id, (viewdata)=>{
        res.render('board/view', {viewdata});    
    });
});

let save = ((req, res)=>{
    let {title, content} = req.body;  //post
    if (title == undefined) {         //title이 값이 없을 때
        res.send('<script>("잘못된 접근입니다.")</script>');
        return;
    }

    if (content == undefined) {         //content이 값이 없을 때
        res.send('<script>("잘못된 접근입니다.")</script>');
        return;
    }

    model.setBoard(title, content, (viewdata)=>{
        res.send('<script>alert("저장되었습니다."); location.href = "/board/list";</script>');   
    });
});

let register = ((req, res) => {
    res.render('board/register');
});

let edit = ((req, res)=> {
    let {title, content} = req.body; //post
    if(title == undefined) {
        res.send('<script>alert("잘못된 접근입니다.")</script>');
        return;
    }
    if(content == undefined) {
        res.send('<script>alert("잘못된 접근입니다.")</script>');
        return;
    }
    
    model.getEdit(title, content, (viewdata)=>{
        res.send('<script>alert("수정되었습니다."); location.href = "/board/list"; </script>');
    });

});

let change = ((req, res) => {
    res.render('board/change')
});


module.exports = {
    list,
    view,
    save,
    register,
    edit,
    change
}