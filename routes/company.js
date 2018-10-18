var express = require('express');
var router = express.Router();

var CompanyController = require('../controllers/Company.controller');

router.get('/get_by_id/:id', function(req, res, next) {
    let id = req.params.id;
    CompanyController.getById(id).then(values => {
        let company = values[0];
        let companyUsers = values[1]
        res.json({
            company: company,
            company_user: companyUsers
        });
    }).catch(err => {console.log(err)});
});

module.exports = router;