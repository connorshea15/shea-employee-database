const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('./db/database');

 connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });

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
  
// Function to show all departments
/* showAllDepartments = () => {
    connection.query(`SELECT * FROM departments`, 
        function(err, res) {
            if (err) throw err;
            console.log(console.table(res));
            afterConnection();
        });
}; */

showAllDepartments = () => {
    connection.promise().query(`SELECT * FROM departments`)
        .then( ([rows, fields]) => {
            console.log(console.table(rows));
            afterConnection();
            return rows;
        })
        .catch(console.log);
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
            choices: [
                "Software Engineer",
                "Structural Engineer",
                "Sales Manager",
                "Construction Manager",
                "Seismologist"
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Choose this employee`s manager',
            choices: [
                "Martha Louisiana",
                "Josiah Michigan",
                "Martha Louisiana",
                ""
            ]
        }
    ]).then(answer => {
        connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                            VALUES ("${answer.firstName}", "${answer.lastName}", 4, 3)`,
            function(err, res) {
                if (err) throw err;
                afterConnection();
        });
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
        } else if (answer.start === 'Add a department!') {
            return addDepartment();
        } else if (answer.start === 'Add a role!') {
            return addRole();
        } else if (answer.start === 'Add an employee!') {
            return addEmployee();
        } else if (answer.start === 'Update and employee role!') {
            return updateEmployeeRole();
        }
    });
  };
