var IndustryModel = require('../models/Industry.model');

var IndustryController = {};
IndustryController.getIndustryList = () => {
    return IndustryModel.getIndustryList().then(value => {
        if(value.status == 'SUCCESS'){
            return value.results;
        }else{
            return value.message;
        }
    }).catch(err => {throw err});
}

module.exports = IndustryController;