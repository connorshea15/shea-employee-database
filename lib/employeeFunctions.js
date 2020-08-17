const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('../db/database');
const { getDepartmentsArray, showAllDepartments, addDepartment } = require('./departmentFunctions');
const { getRolesArray, showAllRoles, addRole } = require('./roleFunctions');

  // Function to return simple array of departments
  getEmployeesArray = () => {
    var employeeArr = [];
    connection.query(`SELECT first_name, last_name FROM employees`, 
        function(err, res) {
            if (err) throw err;
            for ( var i = 0; i < res.length; i++ ) {
                employeeArr.push(i + 1 + " " + res[i].first_name + " " + res[i].last_name);
            };
        });
    return employeeArr;
  }; 

  // Function to show all employees
showAllEmployees = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, 
                        roles.title AS title, 
                        departments.name AS department, 
                        roles.salary AS salary, 
                        CONCAT(m.first_name, ' ', m.last_name) AS manager
                        FROM employees e
                        LEFT JOIN roles ON e.role_id = roles.id
                        LEFT JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees m ON m.id = e.manager_id;`, 
        function(err, res) {
            if (err) throw err;
            console.log(console.table(res));
            afterConnection();
        });
};

// Function to add an employee
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Choose the new employee`s role',
            choices: getRolesArray()
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Choose this employee`s manager',
            choices: getEmployeesArray()
        }
    ]).then(answer => {
        connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                            VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.role.charAt(0)}, ${answer.manager.charAt(0)})`,
            function(err, res) {
                if (err) throw err;
                afterConnection();
        });
    });
};

// Function to add a department
updateEmployeeRole = (employees) => {
    inquirer.prompt([
    {
        type: 'list',
        name: 'employee',
        message: 'Choose which employee you would like to update',
        choices: employees
    },
    {
        type: 'list',
        name: 'role',
        message: 'Choose the employee`s new role',
        choices: getRolesArray()
    }
]).then(answer => {
    connection.query(`UPDATE employees SET role_id = ${answer.role.charAt(0)} WHERE id = ${answer.employee.charAt(0)}`,
        function(err, res) {
            if (err) throw err;
            afterConnection();
    });
}).catch(err => {
    console.log(err);
});
};

module.exports = {
    getEmployeesArray: getEmployeesArray,
    showAllEmployees: showAllEmployees,
    addEmployee: addEmployee,
    updateEmployeeRole: updateEmployeeRole
};