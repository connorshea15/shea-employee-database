const cTable = require('console.table');
const connection =require('./db/database');

  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });
  
  afterConnection = () => {
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
            connection.end();
        });
  };