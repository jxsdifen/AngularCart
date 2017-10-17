var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var router = express.Router();

var dbConfig = require('./dbConfig.js');
var pool = mysql.createPool(dbConfig.mysql);
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({ state: 'fail', msg: '操作失败', data: [] });
    } else {
        res.json(ret);
    }
}

var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var sqlStr = {
    select: 'select * from goods',
};
router.get('/list', cors(corsOptions), function(req, res, next){
	pool.query(sqlStr.select, function(error, rows, fields){
		if (rows) {
            rows = {
                state: 'success',
                msg: '操作成功',
                data: rows
            };
        }
        responseJSON(res, rows);
	})
});

module.exports = router;