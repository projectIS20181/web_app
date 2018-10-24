var UserModel = require('../models/User.model');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;

var UserController = {};
UserController.candidateSaveRecruitment = (candidateId, recruitmentId) => {
    if(!candidateId || !recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CandidateId and RecruitmentId must not be NULL!'
        });
    }

    return UserModel.candidateSaveRecruitment(parseInt(candidateId), parseInt(recruitmentId)).then(insertId => { 
        if(!insertId){
            return {
                status: 'FAILED',
                message: 'Cannot save recruitment'
            };
        }else{
            return {
                status: 'SUCCESS',
                insert_id: insertId
            };
        }
    }).catch(err => {console.log(err)});
}

UserController.getRecruitmentByCandidateId = (candidateId, limit = -1, offset = -1) => {
    if(!candidateId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CandidateId must not be NULL!'
        });
    }
    return UserModel.getRecruitmentByCandidateId(candidateId, limit, offset).then(results => { 
        if(!results){
            return {
                status: 'FAILED',
                message: 'Cannot get recruitment by candidate id'
            };
        }else{
            return {
                status: 'SUCCESS',
                list_jobs: results
            };
        }
    }).catch(err => {console.log(err)});
}

UserController.deleteRecByCandidate = (candidateId, recruitmentId) => {
    if(!candidateId || !recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CandidateId and recruitmentId must not be NULL!'
        });
    }
    return UserModel.deleteRecByCandidate(candidateId, recruitmentId).then(results => { 
        if(!results){
            return {
                status: 'FAILED',
                message: 'Cannot get recruitment by candidate id'
            };
        }else{
            return {
                status: 'SUCCESS',
                message: 'Delete recruitment successfully!'
            };
        }
    }).catch(err => {console.log(err)});
}

module.exports = UserController;

