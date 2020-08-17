const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('./db/database');
const { getDepartmentsArray, showAllDepartments, addDepartment } = require('./lib/departmentFunctions');
const { getRolesArray, showAllRoles, addRole } = require('./lib/roleFunctions');
const { getEmployeesArray, showAllEmployees, addEmployee, updateEmployeeRole } = require('./lib/employeeFunctions');

// Open connection between node and mysql
 connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });

// This is my initial user prompt where the user decides what they want to do
  afterConnection = () => {
    // Store simple array of employee names to work with in later functions
    var employees = getEmployeesArray();
    // we will inquire about what this person wants to do
    inquirer.prompt([
        {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: [
            'View all departments!',
            'View all roles!',
            'View all employees!',
            'Add a department!',
            'Add a role!',
            'Add an employee!',
            'Update an employee role!',
            'I am done!'
        ]
        }
    ]).then(answer => {
        if(answer.start === 'View all departments!') {
            return showAllDepartments();
        } else if (answer.start === 'View all roles!') {
            return showAllRoles();
        } else if (answer.start === 'View all employees!') {
            return showAllEmployees();
        } else if (answer.start === 'Add a department!') {
            return addDepartment();
        } else if (answer.start === 'Add a role!') {
            return addRole();
        } else if (answer.start === 'Add an employee!') {
            return addEmployee();
        } else if (answer.start === 'Update an employee role!') {
            return updateEmployeeRole(employees);
        } else {
            return;
        }
    }).catch(err => {
        console.log(err);
    });
  };
