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
module.exports = RecruitmentController;
