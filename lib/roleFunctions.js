const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('../db/database');
const { getDepartmentsArray, showAllDepartments, addDepartment } = require('./departmentFunctions');

  // Function to return simple array of departments
  getRolesArray = () => {
    var roleArr = [];
    connection.query(`SELECT title FROM roles`, 
        function(err, res) {
            if (err) throw err;
            for ( var i = 0; i < res.length; i++ ) {
                roleArr.push(i + 1 + " " + res[i].title);
            };
        });
    return roleArr;
  };  

  // Function to show all roles
showAllRoles = () => {
    connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department_name
                        FROM roles
                        LEFT JOIN departments ON roles.department_id = departments.id;`, 
        function(err, res) {
            if (err) throw err;
            console.log(console.table(res));
            afterConnection();
        });
};

// Function to add a role
addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Enter the department that this new role is a part of',
            choices: getDepartmentsArray()
        }
    ]).then(answer => {
        connection.query(`INSERT INTO roles (title, salary, department_id) 
                            VALUES ("${answer.name}", ${answer.salary}, ${answer.department.charAt(0)})`,
            function(err, res) {
                if (err) throw err;
                afterConnection();
        });
    });
};

module.exports = {
    getRolesArray: getRolesArray,
    showAllRoles: showAllRoles,
    addRole: addRole
};