var express = require('express');
var router = express.Router();

var UserController = require('../controllers/User.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/candidate_save_rec', function(req, res, next) {
    let candidateId = req.body.candidate_id;
    let recruitmentId = req.body.recruitment_id;    
    UserController.candidateSaveRecruitment(candidateId, recruitmentId).then(result => {
        res.json(result)
    });
});

router.get('/get_rec_by_candidate/:id', function(req, res, next) {
    let candidateId = req.params.id;
    let limit = req.query.limit || -1;
    let offset = req.query.offset || -1;
    
    UserController.getRecruitmentByCandidateId(candidateId, limit, offset).then(result => {
        res.json(result)
    });
});

router.post('/del_rec_by_candidate', function(req, res, next) {
    let candidateId = req.body.candidate_id;
    let recruitmentId = req.body.recruitment_id;    
    UserController.deleteRecByCandidate(candidateId, recruitmentId).then(result => {
        res.json(result)
    });
});

module.exports = router;