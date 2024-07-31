var express = require('express');
var router = express.Router();
var sql=require('mssql');

/* GET compose page. */
router.get('/', function(req, res, next) {
  res.render('compose');
});

router.post('/', async function(req,res){
  const title=req.body.title;
  const content=req.body.content;
  const date = new Date().toISOString();

    try{
      const query = `INSERT INTO userData (title, content, date) VALUES ('${title}', '${content}', '${date}')`;
      await sql.query(query);
      console.log("Data inserted Succesfully");
      res.redirect('/');
    }
    catch(err){
      console.log(err);
      res.send("Error,Submiting try again");
    }
});

module.exports = router;
