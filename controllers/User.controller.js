var UserModel = require('../models/User.model');
var CareerModel = require('../models/CareerInfo.model');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;
const USER_ROLE = require('../configs/constant').USER_ROLE;

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

UserController.getRecruitmentByCandidateId = (candidateId, limit = 10, offset = 0) => {
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

UserController.registerCandidate = (user) => {
    if ((!user.email && !user.user_name) || !user.password){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Email (or Username) and Password must not be NULL!'
        });
    }
    if (!user.email) user.email = '';
    if (!user.user_name) user.user_name = '';
    user.role = USER_ROLE.CANDIDATE;
    return UserModel.getUserByEmailOrName(user).then(existedUser =>{
        if(existedUser){
            return {
                status: 'FAILED',
                message: 'Username or email is existed!'
            };
        }
        return UserModel.addNewUser(user).then(userId => {
            if (!userId){
                return {
                    status: 'FAILED',
                    message: 'Cannot add new user. Check again'
                };
            }
            var candidate = {
                user_id_fk: userId,
                first_name: user.first_name,
                last_name: user.last_name
            }
            return UserModel.addNewCandidate(candidate).then(candidateId => {
                if (!candidateId){
                    return {
                        status: 'FAILED',
                        message: 'Cannot add new candidate. Check again'
                    };
                }
                return {
                    status: 'SUCCESS',
                    user_id: userId,
                    candidate_id: candidateId 
                }
            })
        }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});    
}

UserController.registerCompany = (user) => {
    if ((!user.email && !user.user_name) || !user.password){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Email (or Username) and Password must not be NULL!'
        });
    }
    if (!user.email) user.email = '';
    if (!user.user_name) user.user_name = '';
    user.role = USER_ROLE.COMPANY;

    return UserModel.getUserByEmailOrName(user).then(existedUser => {
        if(existedUser){
            return {
                status: 'FAILED',
                message: 'Username or email is existed!'
            };
        }
        return UserModel.addNewUser(user).then(userId => {
            if (!userId){
                return {
                    status: 'FAILED',
                    message: 'Cannot add new user. Check again'
                };
            }
            var candidate = {
                user_id_fk: userId,
                first_name: user.first_name,
                last_name: user.last_name
            }
            return UserModel.addNewCompanyUser(candidate).then(candidateId => {
                if (!candidateId){
                    return {
                        status: 'FAILED',
                        message: 'Cannot add new candidate. Check again'
                    };
                }
                return {
                    status: 'SUCCESS',
                    user_id: userId,
                    candidate_id: candidateId 
                }
            })
        }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});
}

UserController.getUserInfo = (user) => {
    if ((!user.email && !user.user_name) || !user.password || !user.role){
        return {
            status: 'FAILED',
            message: 'Email (username) and Password and Role must not be NULL!'
        };        
    }
    return UserModel.getUserByEmailOrName(user).then(resultUser => {
        if(!resultUser){
            return {
                status: 'FAILED',
                message: 'Email (username) or Password or Role are incorrect. Check again.'
            };
        }
        if(user.role == USER_ROLE.CANDIDATE){
            return UserModel.getCandidateByUserId(resultUser.user_id).then(candidate => {
                if(!candidate){
                    return {
                        status: 'FAILED',
                        message: 'Cannot get candidate by user id'
                    };
                }
                return {
                    status: 'SUCCESS',
                    user: resultUser,
                    candidate: candidate
                }
            });
        }else if(user.role == USER_ROLE.COMPANY){
            return UserModel.getCompanyUserByUserId(resultUser.user_id).then(companyUsers => {
                if(!companyUsers){
                    return {
                        status: 'FAILED',
                        message: 'Cannot get candidate by user id'
                    };
                }
                return {
                    status: 'SUCCESS',
                    user: resultUser,
                    company_users: companyUsers
                }
            });
        }
    }).catch(err => {console.log(err)});
}

UserController.updateCandidateInfo = (candidate = {}, careerInfo = {}) => {
    if(!candidate.candidate_id){
        return {
            status: 'FAILED',
            message: 'Candidate.candidate_id must not be NULL!'
        };
    }
    updateCareer = true;
    if(careerInfo && Object.keys(careerInfo).length > 0){
        // update career info
        updateCareer = UserModel.getCandidateById(candidate.candidate_id).then(result => {
            var careerInfoIdFk = result.career_info_id_fk;            
            if(careerInfoIdFk == 0){
                // insert new one
                return CareerModel.insertNewCareer(careerInfo).then(resultId => {
                    if(!resultId) return false;
                    candidate['career_info_id_fk'] = resultId;
                    return true;
                });
            }else{
                //update an existed one
                careerInfo.career_info_id = careerInfoIdFk;
                return CareerModel.updateCareerById(careerInfo).then(updatedRes => {
                    return updatedRes;
                });
            }
        })
    }

    return Promise.all([updateCareer]).then(values => {
        var updatedCareer = values[0];
        var updatedCandidate = true;
        console.log(candidate);
        if(Object.keys(candidate).length > 1){
            // update candidate info
            return UserModel.updateCandidateById(candidate).then(result => {
                return [updatedCareer, result];
            });
        }else{
            return [updatedCareer, updatedCandidate];
        }
    }).then(values => {
        if(values[0] && values[1]){
            return {
                status: 'SUCCESS',
                message: 'Update candidate info successfully!'
            };
        }
        return {
            status: 'FAILED',
            message: 'Cannot update at Candidate or Career_info',
            candidate_status: values[1],
            career_status: values[0] 
        };
    });
}

//todo get_user_by_id
UserController.getUserById = (user_id) => {
    if(!user_id){
        return {
            status: 'FAILED',
            message: 'user_id must not null'
        }
    }
    return UserModel.getUserById(parseInt(user_id)).then(resultUser => {
        if(!resultUser) {
            return {
                status: 'FAILED',
                message: 'user_id are incorrect. Check again.'
            };
        };
        return  {
            status: 'SUCCESS',
            user: resultUser,
        }
    })
    .catch(err => console.log(err))
}
 




module.exports = UserController;

