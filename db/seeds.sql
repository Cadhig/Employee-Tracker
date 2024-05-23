INSERT INTO department (deptname)
VALUES ('accounting');

INSERT INTO department (deptname)
VALUES ('engineering');

INSERT INTO department (deptname)
VALUES ('management');

INSERT INTO role (title, salary, department_id) --1
VALUES ('sales', 30000, 1);

INSERT INTO role (title, salary, department_id) --2
VALUES ('accountant', 50000, 1);

INSERT INTO role (title, salary, department_id) --3
VALUES ('engineer', 80000, 2);

INSERT INTO role (title, salary, department_id) --4
VALUES ('senior engineer', 100000, 2);

INSERT INTO role (title, salary, department_id) --5
VALUES ('accounting manager', 70000, 3);

INSERT INTO role (title, salary, department_id) --6
VALUES ('lead engineer', 120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Camille', 'Laurent', 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Lottie', 'Clarke', 6, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Clarence', 'Hill', 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Clareese', 'Johnson', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Timothy', 'Awesomepants', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Andrew', 'Garfield', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Greg', 'Smith', 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bartholomew', 'Reginald', 4, 2);
