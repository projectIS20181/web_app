var RecruitmentModel = require('../models/Recruitment.model');

var RecruitmentController = {};

RecruitmentController.getByIndustryId = (recruitmentId, limit = -1, offset = -1) => {
    return RecruitmentModel.getByIndustryId(recruitmentId, limit, offset).then(value => {
        if(value.status == 'SUCCESS'){
            return value.result;
        }else{
            return value.message;
        }
    }).catch(err => {throw err;});
}

module.exports = RecruitmentController;
