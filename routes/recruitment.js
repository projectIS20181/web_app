var express = require('express');
var router = express.Router();

var RecruitmentController = require('../controllers/Recruitment.controller');

router.get('/get_by_industry_id/:id', function(req, res, next) {
    // Eg: get_by_id/1?limit=10&offset=0

    let id = req.params.id;
    let limit = req.query.limit || -1;
    let offset = req.query.offset || -1;
    
    RecruitmentController.getByIndustryId(id, limit, offset).then(recruitments => {
        res.json(recruitments);
    }).catch(err => {throw err;});
});

router.post('/add_new_recuitment', function(req, res, next) {
    var recruitment = req.body;
    RecruitmentController.addNewRecruitment(recruitment).then(result => {
        res.json(result)
    });
});


module.exports = router;