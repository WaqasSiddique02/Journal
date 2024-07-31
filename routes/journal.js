var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/', function(req, res) {
    res.status(400).send('User ID is required');
});

/* GET a specific journal. */
router.get('/:userId', async function(req, res, next) {
    var post = req.params.userId;
    try {
        const result = await sql.query(`SELECT title, content, date,userId FROM userData WHERE userId = ${post};`);
        if (result.recordset.length > 0) {
            var info = result.recordset[0];
            res.render('journal', { 
                title: info.title,
                content: info.content,
                date: info.date,
                userId:info.userId
            });
        } else {
            res.status(404).send('Journal not found');
        }
    } catch (err) {
        next(err);
    }
});


router.post('/:id/delete', async (req, res) => {
    const postId = req.params.id;
    try {
        await sql.query`DELETE FROM userData WHERE userId = ${postId}`;
        res.redirect('/'); 
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Error deleting post');
    }
});

module.exports = router;