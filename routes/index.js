var express = require('express');
var router = express.Router();
var sql = require('mssql');

/* GET home page with journals. */
router.get('/', async function(req, res, next) {
  try {
    const result = await sql.query("SELECT title, content, date FROM userData;");

    res.render('index', { 
      title: 'Home',
      journals: result.recordset 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;