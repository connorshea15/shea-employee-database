const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('../db/database');

  // Function to return simple array of departments
  getDepartmentsArray = () => {
    var departmentArr = [];
    connection.query(`SELECT name FROM departments`, 
        function(err, res) {
            if (err) throw err;
            for ( var i = 0; i < res.length; i++ ) {
                departmentArr.push(i + 1 + " " + res[i].name);
            };
        });
    return departmentArr;
  };  

    // Array to display all of the departments
showAllDepartments = () => {
    connection.promise().query(`SELECT * FROM departments`)
        .then( ([rows, fields]) => {
            console.log(console.table(rows));
            afterConnection();
        })
        .catch(console.log);
};

// Function to add a department
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the new department'
        }
    ]).then(answer => {
        connection.query(`INSERT INTO departments (name) VALUES ("${answer.department}")`,
            function(err, res) {
                if (err) throw err;
                afterConnection();
        });
    });
};

module.exports = {
    getDepartmentsArray: getDepartmentsArray,
    showAllDepartments: showAllDepartments,
    addDepartment: addDepartment
};