const express = require('express'),
router = express.Router()
const summary = require("../controllers/summary")

app.use(express.json());
app.use((req,res,next)=>{
    next();
});

router.get('/', summary.table1)



module.exports = router