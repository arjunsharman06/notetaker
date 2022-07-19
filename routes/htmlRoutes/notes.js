const path = require('path');
const router = require('express').Router();

// Handing the root page request
router.get('/notes',(req,res) => {
res.sendFile(path.join(__dirname + '../../../public/notes.html'));
});

// Wildcard entry
router.get('*',(req,res) => {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
    });
    
module.exports = router;