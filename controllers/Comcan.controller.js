var ComcanModel = require('../models/Comcan.model');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;

var ComcanController = {};


// insert into Company_candidate table 
ComcanController.FollowComCan = (candidateId, companyId, newType = 0) => {
    if(!candidateId || !companyId || !newType){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CompanyId and CandidateId and Type must not be NULL!'
        });
    }

    if(newType != COMPANY_CANDIDATE.COM_FOLLOW_CAN && newType != COMPANY_CANDIDATE.CAN_FOLLOW_COM){
         return Promise.resolve({
            status: 'FAILED',
            message: 'Wrong type. check again'
        });
    }

    return ComcanModel.getTypeOfComCan(candidateId, companyId).then(value => {
        if(value && value.length){
            return value[0].type;            
        }
        return -1;        
    }).then(oldType => {
        // existed => Just need to update
        if(oldType == COMPANY_CANDIDATE.FOLLOW_EACHOTHER){
            return {
                status: 'SUCCESS',
                message: 'Update successfully'
            };
        }else if(oldType > -1){
            return ComcanController.updateComCanFollowing(candidateId, companyId, newType);
        } 
        else{
            return ComcanModel.insertComCanFollowing(candidateId, companyId, newType).then(result => {
                if(result){
                    return {
                        status: 'SUCCESS',
                        message: 'Update successfully'
                    };
                }
                return {
                    status: 'FAILED',
                    message: 'Failed update'
                };
            });
        }   
    }).catch(err => console.log(err));
}

ComcanController.updateComCanFollowing = (candidateId, companyId, newType) => {
    if(!candidateId || !companyId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CompanyId and CandidateId must not be NULL!'
        });
    }
    newType = parseInt(newType);
    return ComcanModel.getTypeOfComCan(candidateId, companyId).then(value => {
        if(value && value.length){
            return parseInt(value[0].type);     
        }
        return -1;        
    }).then(oldType => {
        // existed => Just need to update
        if(oldType > -1){
            var updatedType = -1;
            if(oldType == COMPANY_CANDIDATE.UNFOLLOW || oldType == COMPANY_CANDIDATE.FOLLOW_EACHOTHER){
                updatedType = newType;
            }else if(oldType == COMPANY_CANDIDATE.CAN_FOLLOW_COM && newType == COMPANY_CANDIDATE.COM_FOLLOW_CAN){
                updatedType = COMPANY_CANDIDATE.FOLLOW_EACHOTHER;
            }else if(oldType == COMPANY_CANDIDATE.COM_FOLLOW_CAN && newType == COMPANY_CANDIDATE.CAN_FOLLOW_COM){
                updatedType = COMPANY_CANDIDATE.FOLLOW_EACHOTHER;
            }else{
                updatedType = newType;
            }
            
            return ComcanModel.updateComCanFollowing(candidateId, companyId, updatedType).then(result => {
                if(result){
                    return {
                        status: 'SUCCESS',
                        message: 'Update successfully'
                    };
                }
                return {
                    status: 'FAILED',
                    message: 'Failed update'
                };
            })            
        }
        return {
            status: 'FAILED',
            message: 'Record wasnt inserted! Cannot update. '
        }  
    }).catch(err => console.log(err));
}

ComcanController.deleteComCanFollowing = (candidateId, companyId, delType) => {
    if(!candidateId || !companyId || !delType){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CompanyId and CandidateId and DelType must not be NULL!'
        });
    }
    if(delType != COMPANY_CANDIDATE.COM_FOLLOW_CAN && delType != COMPANY_CANDIDATE.CAN_FOLLOW_COM){
         return Promise.resolve({
            status: 'FAILED',
            message: 'Wrong type. check again'
        });
    }
    return ComcanModel.getTypeOfComCan(candidateId, companyId).then(value => {
        if(value && value.length){
            return parseInt(value[0].type);     
        }
        return -1;        
    }).then(oldType => {
        var newType = 0;
        if(oldType == COMPANY_CANDIDATE.FOLLOW_EACHOTHER){
            if(delType == COMPANY_CANDIDATE.CAN_FOLLOW_COM){
                newType = COMPANY_CANDIDATE.COM_FOLLOW_CAN;
            }else if(delType == COMPANY_CANDIDATE.COM_FOLLOW_CAN){
                newType == COMPANY_CANDIDATE.CAN_FOLLOW_COM
            }
        }
    
        return ComcanController.updateComCanFollowing(candidateId, companyId, newType);
    })
    
}

ComcanController.getComByCanId = (candidateId, limit = -1, offset = -1) => {
    if(!candidateId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'CandidateId must not be NULL!'
        });
    }
    return ComcanModel.getComByCanId(candidateId).then(results => {
        if(!results){
            return {
                status: 'FAILED',
                message: 'Cannot get company by candidate id'
            };
        }
        return {
            status: 'SUCCESS',
            list_company: results
        };
    })
}
module.exports = ComcanController;