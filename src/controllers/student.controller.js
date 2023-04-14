const StudentService = require('../services/student.service');

exports.insert = (req, res) => {
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    // req.body.password = salt + "$" + hash;
    // req.body.permissionLevel = 1;
    StudentService.createStudent(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }            res.status(201).send({id: result._id});

    StudentService.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getById = (req, res) => {
    StudentService.findById(req.params.studentId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    StudentService.patchStudent(req.params.studentId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    StudentService.removeById(req.params.studentId)
        .then((result) => {
            res.status(204).send({});
        });
};