const mongoose = require('../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const parentsSchema = new Schema({
    createdDate: String,
    updatedDate: String,
    fullName: String,
    phone: String,
    dob: String,
    relationship: String,
    job: String,
});

const studentsSchema = new Schema({
    createdDate: String,
    updatedDate: String,
    studentsNumber: String,
    fullName: String,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: String,
    birthplace: String,
    highSchool: String,
    peoples: String,
    briefcase: [String],
    healthInsurance: String,
    citizenId: { type: String, unique: true },
    licenseDate: String,
    issuedBy: String,
    phone: String,
    address: String,
    province: String,
    district: String,
    ward: String,
    parents: [parentsSchema],
    status: String,
});

studentsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
studentsSchema.set('toJSON', {
    virtuals: true
});

studentsSchema.findById = function (cb) {
    return this.model('Students').find({ id: this.id }, cb);
};

const Student = mongoose.model('Student', studentsSchema);

module.exports = Student;
