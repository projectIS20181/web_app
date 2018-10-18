var express = require('express');
var router = express.Router();

var IndustryController = require('../controllers/Industry.controller');

router.get('/get_industry_list', function(req, res, next) {
    IndustryController.getIndustryList().then(industryList => {
        res.json({result: industryList});
    }).catch(err => {throw err;});
});

module.exports = router;