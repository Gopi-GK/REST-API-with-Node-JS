const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

//var employeeModel =mongoose.model('employees',employeeSchema);
module.exports = mongoose.model('Employees', employeeSchema);
