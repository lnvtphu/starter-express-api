const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createStudent = catchAsync(async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.status(httpStatus.CREATED).send(student);
});

const getStudents = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await studentService.queryStudents(filter, options);
    res.send(result);
});

const getStudent = catchAsync(async (req, res) => {
    const student = await studentService.getStudentById(req.params.studentId);
    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    res.send(student);
});

const updateStudent = catchAsync(async (req, res) => {
    const student = await studentService.updateStudentById(req.params.studentId, req.body);
    res.send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
    await studentService.deleteStudentById(req.params.studentId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
}