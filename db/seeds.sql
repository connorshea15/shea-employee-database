INSERT INTO departments (name)
    VALUES ("Engineering"), ("Sales"), ("Construction");

INSERT INTO roles (title, salary, department_id)
    VALUES 
        ("Engineering Manager", 94000, 1), 
        ("Software Engineer", 82500, 1), 
        ("Structural Engineer", 84000, 1),
        ("Sales Manager", 91000, 2), 
        ("Software Sales", 72500, 2), 
        ("Structural Sales", 74000, 2),
        ("Construction Manager", 91000, 3), 
        ("Foreman", 82500, 3), 
        ("Seismologist", 84000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
        ("Martha", "Louisiana", 1, NULL), 
        ("John", "Alabama", 2, 1),  
        ("Joseph", "NewYork", 3, 1), 
        ("Josiah", "Michigan", 4, NULL), 
        ("Jessica", "Minnesota", 5, 4),  
        ("Joseph", "NewYork", 6, 4), 
        ("Martha", "Louisiana", 7, NULL), 
        ("John", "Alabama", 8, 7),  
        ("Joseph", "NewYork", 9, 7); 


