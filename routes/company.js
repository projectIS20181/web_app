var express = require('express');
var router = express.Router();

var CompanyController = require('../controllers/Company.controller');

router.get('/get_by_id/:id', function(req, res, next) {
    let id = req.params.id;
    CompanyController.getById(id).then(result => {
        res.json(result);
    }).catch(err => {console.log(err)});
});

module.exports = router;