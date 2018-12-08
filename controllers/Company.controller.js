var CompanyModel = require('../models/Company.model');
var UserModel = require('../models/User.model');

var CompanyController = {};

CompanyController.getById = (companyId) => {
    if(!companyId){
        return Promise.resolve({
            status: 'FAILED',
            message: 'Company Id must not be NULL!'
        });
    }

    const getCompany = (id) => {
        return CompanyModel.getById(id).then(value => {
            return value;
        }).catch(err => console.log(err));
    } 

    const getCompanyUsers = (id) => {
        return UserModel.getCompanyUserByCompanyId(id).then(value => {
            return value;
        }).catch(err => console.log(err));
    }

    return Promise.all([getCompany(companyId), getCompanyUsers(companyId)]).then(values => { 
        let company = values[0];
        let companyUsers = values[1]
        var status = '';
        var message = ''
        if(!company){
            status = 'FAILED';
            message = 'Cannot get company by Id'
        }if(!companyUsers){
            status = 'FAILED';
            message = 'Cannot get companyUsers by company Id'
        }else{
            status = 'SUCCESS';
        }
        return {
            status: status,
            message: message,
            company: company,
            company_user: companyUsers
        };
    }).catch(err => console.log(err));
}

CompanyController.updateCompanyById = (company = {}) => {
    if(!company.company_id){
        return {
            status: 'FAILED',
            message: 'Company_id must not be NULL!'
        };
    }
    return CompanyModel.updateCompanyById(company).then(result => { 
        if(!result){
            return {
                status: 'FAILED',
                message: 'Cannot update company table by Company_id'
            };
        }else{
            return {
                status: 'SUCCESS',
                message: 'Update successfully!'
            };
        }
    }).catch(err => {console.log(err)});
}

module.exports = CompanyController;
