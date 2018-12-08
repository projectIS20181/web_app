var RecruitmentModel = require('../models/Recruitment.model');

var RecruitmentController = {};

RecruitmentController.getByIndustryId = (industryIdFk, limit = 10, offset = 0) => {
    if (!industryIdFk){
        return Promise.resolve({
            status: 'FAILED',
            message: 'industry_id_fk must not be NULL!'
        });
    }
    return RecruitmentModel.getByIndustryId(industryIdFk, limit, offset).then(results => {
        if(!results){
            return({
                status: 'FAILED',
                message: 'Cannot get industry by this Id.'
            });
        }else{
            return({
                status: 'SUCCESS',
                results: results
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.addNewRecruitment = (recruitment) => {
    if (!recruitment.company_id_fk || !recruitment.industry_id_fk){
        return Promise.resolve({
            status: 'FAILED',
            message: 'company_id_fk and industry_id_fk must not be null.'
        }); 
    }
    return RecruitmentModel.addNewRecruitment(recruitment).then(insertId => {
        if(!insertId){
            return({
                status: 'FAILED',
                message: 'Cannot add new recruitment. Check again.'
            });
        }else{
            return({
                status: 'SUCCESS',
                recruitment_id: insertId
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.searchByCriteria = (criteria, limit = 10, offset = 0) => {
    if(!criteria || !Object.keys(criteria).length){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Has no criteria'
        });        
    }
    return RecruitmentModel.search(criteria, limit, offset).then(results => {
        if(!results){
            return({
                status: 'FAILED',
                message: 'Cannot get any record by criteria'
            });
        }
        return({
            status: 'SUCCESS',
            results: results
        });
    });
}

RecruitmentController.rate = (recruitment) => {
    var recruitmentId = recruitment.recruitment_id; 
    if(!recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'RecruitmentId must not be null!'
        });        
    }
    var point = recruitment.point;
    return RecruitmentModel.rate(point, recruitmentId).then(result => {
        if(!result){
            return({
                status: 'FAILED',
                message: 'Cannot get recruitment by id'
            });
        }
        return({
            status: 'SUCCESS',
            message: 'Rate successfully!'
        });
    });
}

RecruitmentController.getAverageRatingPoint = (recruitmentId) => {
    if(!recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'RecruitmentId must not be null!'
        });        
    }
    return RecruitmentModel.getRatingPoint(recruitmentId).then(result => {
        if(!result){
            return({
                status: 'FAILED',
                message: 'Cannot get recruitment by id'
            });
        }
        var total = result.total_rating;
        var quantity = result.rating_quantity;
        if(total == 0 || quantity == 0){
            return({
                status: 'SUCCESS',
                result: 0
            });
        }
        return({
            status: 'SUCCESS',
            result: (total/quantity).toFixed(2)
        });
    });
}

RecruitmentController.getByCompanyId = (companyIdFk, limit = 10, offset = 0) => {
    if (!companyIdFk){
        return Promise.resolve({
            status: 'FAILED',
            message: 'company_id_fk must not be NULL!'
        });
    }
    return RecruitmentModel.getByCompanyId(companyIdFk, limit, offset).then(results => {
        if(!results){
            return({
                status: 'FAILED',
                message: 'Cannot get recruitment by this Id.'
            });
        }else{
            return({
                status: 'SUCCESS',
                results: results
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.getById = (recruitmentId, limit = 10, offset = 0) => {
    if (!recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Recruitment_id must not be NULL!'
        });
    }
    return RecruitmentModel.getById(recruitmentId, limit, offset).then(result => {
        if(!result){
            return({
                status: 'FAILED',
                message: 'Cannot get recruitment by this Id.'
            });
        }else{
            return({
                status: 'SUCCESS',
                result: result
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.getByTypePost = (typePost, companyIdFk, limit = 10, offset = 0) => {
    if (!typePost|| !companyIdFk){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Type_post and company_id_fk must not be NULL!'
        });
    }
    return RecruitmentModel.getByTypePost(typePost, companyIdFk, limit, offset).then(results => {
        if(!results){
            return({
                status: 'FAILED',
                message: 'Cannot get any recruitment by this type_post & company_id_fk.'
            });
        }else{
            return({
                status: 'SUCCESS',
                results: results
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.deleteById = (recruitmentId) => {
    if (!recruitmentId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Recruitment_id must not be NULL!'
        });
    }
    return RecruitmentModel.deleteById(recruitmentId).then(result => {
        if(!result){
            return({
                status: 'FAILED',
                message: 'Cannot delete recruitment by this recruitment_id.'
            });
        }else{
            return({
                status: 'SUCCESS',
                message: 'Delete successfully!'
            });
        }
    }).catch(err => {throw err;});
}

RecruitmentController.updateRecruitmentById = (recruitment = {}) => {
    if(!recruitment.recruitment_id){
        return {
            status: 'FAILED',
            message: 'Recruitment_id must not be NULL!'
        };
    }
    return RecruitmentModel.updateRecruitmentById(recruitment).then(result => { 
        if(!result){
            return {
                status: 'FAILED',
                message: 'Cannot update recruitment table by Recruitment_id'
            };
        }else{
            return {
                status: 'SUCCESS',
                message: 'Update successfully!'
            };
        }
    }).catch(err => {console.log(err)});
}

module.exports = RecruitmentController;
