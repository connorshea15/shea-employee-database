INSERT INTO departments (name)
    VALUES ("Engineering"), ("Sales"), ("Construction");

INSERT INTO roles (title, salary, department_id)
    VALUES 
        ("Engineering Manager", 94000, 1), 
        ("Software Engineer", 82500, 1), 
        ("Sales Manager", 91000, 2), 
        ("Software Sales", 72500, 2), 
        ("Construction Manager", 91000, 3), 
        ("Seismologist", 84000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ("Martha", "Louisiana", 1, NULL), 
        ("John", "Alabama", 2, 1),  
        ("Josiah", "Michigan", 3, NULL), 
        ("Jessica", "Minnesota", 4, 3),  
        ("Martha", "Louisiana", 5, NULL), 
        ("Joseph", "NewYork", 6, 5); 


