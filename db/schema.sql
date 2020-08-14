DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE departments(
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    deparment_id INTEGER(11),
    CONSTRAINT fk_department FOREIGN KEY (deparment_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INTEGER(11), 
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);
