'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});

const capitalize = function(str) {
  let cap = str[0];
  let rest = str.slice(1);
  return cap.toUpperCase() + rest;
};

Student.beforeCreate((student, options) => {
  student.firstName = capitalize(student.firstName);
  student.lastName = capitalize(student.lastName);
});

Student.prototype.initials = function() {
  return `${this.firstName[0]} ${this.lastName[0]}`;
};

module.exports = Student;
