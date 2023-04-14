const Student = require('../models/student.model');


/**
 * Get student by id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
    return Student.findById(id);
};

exports.createStudent = async (studentData) => {
    const { citizenId = '' } = studentData;
    const existingStudent = await Student.findOne({ citizenId });
    if (existingStudent) {
        return {}
    } else {
        const student = new Student(studentData);
        return student.save();
    }
    // return Student.findOneAndUpdate(
    //     { citizenId },                 // find a document with that filter
    //     { $setOnInsert: studentData }, // document to insert when nothing was found
    //     { upsert: true, new: true, runValidators: true }
    // )

    // const student = new Student(studentData);
    // return student.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Student.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, students) {
                if (err) {
                    reject(err);
                } else {
                    resolve(students);
                }
            })
    });
};

exports.patchStudent = (id, studentData) => {
    return Student.findOneAndUpdate({
        _id: id
    }, studentData);
};

exports.removeById = (studentId) => {
    return new Promise((resolve, reject) => {
        Student.deleteMany({ _id: studentId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

