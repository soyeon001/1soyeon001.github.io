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

const change = ((req, res)=>{
    let {id, page, searchkey} = req.query;


    model.getView(id, (viewdata) =>{
        res.render('board/change',{viewdata, page, searchkey});
    });
}); 

const updateData = ((req, res)=>{
    let {id, title, content} = req.body;

    if(id == undefined) {
        res.send('<script>alert("잘못된 접근입니다.");</script>');
        return;
    }

    model.updateData(id, title, content, (viewdata) =>{
        res.send('<script>alert("수정되었습니다."); location.href = "/board/list";</script>');
    });

    
});




module.exports = {
    list,
    view,
    save,
    register,
    edit,
    change
}
