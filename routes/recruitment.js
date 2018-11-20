var express = require('express');
var router = express.Router();

var RecruitmentController = require('../controllers/Recruitment.controller');

router.get('/get_by_industry_id/:id', function(req, res, next) {
    // Eg: get_by_id/1?limit=10&offset=0

    let id = req.params.id;
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    
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

router.get('/search', function(req, res, next) {
    var criteria = req.query;
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    if(criteria.hasOwnProperty('limit')){
        delete criteria.limit;
    }
    if(criteria.hasOwnProperty('offset')){
        delete criteria.offset;
    }
    RecruitmentController.searchByCriteria(criteria, limit, offset).then(result => {
        res.json(result);
    });    
});

router.post('/rate', function(req, res, next) {
    var recruitment = req.body;
    RecruitmentController.rate(recruitment).then(result => {
        res.json(result)
    });
});

router.post('/average_rating_point', function(req, res, next) {
    var recruitmentId = req.body.recruitment_id;
    RecruitmentController.getAverageRatingPoint(recruitmentId).then(result => {
        res.json(result)
    });
});



module.exports = router;