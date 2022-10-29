const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let fruits = ['사과','배', '바나나',];
    res.render('index', {fruits});
});


module.exports = router;