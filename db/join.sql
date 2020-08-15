
-- This gives me a table of roles, salary, department_id, and department_name
SELECT roles.*, departments.name AS department_name
        FROM roles
        OUTER JOIN departments ON roles.department_id = departments.id;

        SELECT e.id, e.first_name, e.last_name, 
        roles.title AS title, 
        departments.name AS department, 
        roles.salary AS salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m ON m.id = e.manager_id;