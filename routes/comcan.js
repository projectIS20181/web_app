var express = require('express');
var router = express.Router();
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;

var ComcanController = require('../controllers/Comcan.controller');

router.post('/follow_company', function(req, res, next){
    var candidateId = req.body.candidate_id;
    var companyId = req.body.company_id;
    var newType = req.body.type;
    if(parseInt(newType) != COMPANY_CANDIDATE.CAN_FOLLOW_COM){
        res.json({
            status: "FAILED",
            message: "Wrong type. check again"
        });
        return;
    }
    ComcanController.FollowComCan(candidateId, companyId, newType).then(result => {
        res.json(result);
    }).catch(err => {throw err;});
});

router.post('/follow_candidate', function(req, res, next){
    var candidateId = req.body.candidate_id;
    var companyId = req.body.company_id;
    var newType = req.body.type;

    if(parseInt(newType) != COMPANY_CANDIDATE.COM_FOLLOW_CAN){
        res.json({
            status: "FAILED",
            message: "Wrong type. check again"
        });
        return;
    }
    ComcanController.FollowComCan(candidateId, companyId, newType).then(result => {
        res.json(result);
    }).catch(err => {throw err;});
});

router.post('/del_following', function(req, res, next){
    var candidateId = req.body.candidate_id;
    var companyId = req.body.company_id;
    var delType = req.body.type;
    ComcanController.deleteComCanFollowing(candidateId, companyId, delType).then(result => {
        res.json(result);
    }).catch(err => {throw err;});
});

router.get('/get_com_by_can_id/:id', function(req, res, next){
    let id = req.params.id;
    let limit = req.query.limit || -1;
    let offset = req.query.offset || -1;
    
    ComcanController.getComByCanId(id, limit, offset).then(companies => {
        res.json(companies);
    }).catch(err => {throw err;});
});

module.exports = router;