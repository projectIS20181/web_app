var CompanyModel = require('../models/Company.model');
var UserModel = require('../models/User.model');

var CompanyController = {};

CompanyController.getById = (companyId) => {
    const getCompany = (id) => {
        return CompanyModel.getById(id).then(value => {
            if(value.status == 'SUCCESS'){
                return value.result;
            }else{
                return value.message;
            }
        }).catch(err => console.log(err));
    } 

    const getCompanyUsers = (id) => {
        return UserModel.getCompanyUserByCompanyId(id).then(value => {
            if(value.status == 'SUCCESS'){
                return value.result;
            }else{
                return value.message;
            }
        }).catch(err => console.log(err));
    }

    return Promise.all([getCompany(companyId), getCompanyUsers(companyId)]).then(values => { 
        let company = values[0];
        let companyUsers = values[1]
        return [company, companyUsers];
    }).catch(err => console.log(err));
}

module.exports = CompanyController;
