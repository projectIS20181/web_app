var IndustryModel = require('../models/Industry.model');

var IndustryController = {};
IndustryController.getIndustryList = () => {
    return IndustryModel.getIndustryList().then(results => { 
        if(!results){
            return {
                status: 'FAILED',
                message: 'Cannot get Industries'
            };
        }else{
            return {
                status: 'SUCCESS',
                results: results
            };
        }
    }).catch(err => {console.log(err)});
}

module.exports = IndustryController;