var express = require('express');
var router = express.Router();
var sql=require('mssql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('compose', { title: 'Home' });
});

router.post('/', async function(req,res){
  const title=req.body.title;
  const content=req.body.content;
  const date = new Date().toISOString();
  if(!title||!content){
    return res.redirect('/compose?error=Please%20fill%20in%20all%20the%20fields');
  }
  else{
    try{
      const query=`INSERT INTO userData (title, content ,date) VALUES (${title},${content},${date})`;
      await sql.query(query);
      console.log("Data inserted Succesfully");
    }
    catch(err){
      console.log(err);
      res.send("Error,Submiting try again");
    }
  }
  res.redirect('/');
});

module.exports = router;
