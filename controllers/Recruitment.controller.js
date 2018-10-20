var RecruitmentModel = require('../models/Recruitment.model');

var RecruitmentController = {};

RecruitmentController.getByIndustryId = (industryIdFk, limit = -1, offset = -1) => {
    if (!industryIdFk){
        return({
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
        return({
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

module.exports = RecruitmentController;
