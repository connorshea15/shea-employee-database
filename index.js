const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('./db/database');

  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });
  
// Function to show all departments
showAllDepartments = () => {
    connection.query(`SELECT * FROM departments`, 
        function(err, res) {
            if (err) throw err;
            console.log(console.table(res));
            //connection.end();
            afterConnection();
        });
};

// Function to show all roles
showAllRoles = () => {
    connection.query(`SELECT roles.*, departments.name AS department_name
                        FROM roles
                        LEFT JOIN departments ON roles.department_id = departments.id;`, 
        function(err, res) {
            if (err) throw err;
            console.log(console.table(res));
            //connection.end();
            afterConnection();
        });
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
            //connection.end();
            afterConnection();
        });
};


  afterConnection = () => {
    
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
            'Update and employee role!'
        ]
        }
    ]).then(answer => {
        if(answer.start === 'View all departments!') {
            return showAllDepartments();
        } else if (answer.start === 'View all roles!') {
            return showAllRoles();
        } else if (answer.start === 'View all employees!') {
            return showAllEmployees();
        }
    });
  };