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

router.post('/register_candidate', function(req, res, next) {
    var user = {
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    UserController.registerCandidate(user).then(result => {
        res.json(result);
    });
});

router.post('/signin_candidate', function(req, res, next) {
    var user = {
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password,
        role: req.body.role
    }
    UserController.getUserInfo(user).then(result => {
        res.json(result);
    });
});

router.post('/signin_company', function(req, res, next) {
    var user = {
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password,
        role: req.body.role
    }
    UserController.getUserInfo(user).then(result => {
        res.json(result);
    });
});

router.post('/update_can_info', function(req, res, next) {
    var candidate = JSON.parse(req.body.candidate);
    var careerInfo = JSON.parse(req.body.career_info);
    // res.json(candidate);
    UserController.updateCandidateInfo(candidate, careerInfo).then(result => {
        res.json(result);
    });
});

module.exports = router;