INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Monika', 'Chandan', 1, 3), ('Ray', 'Peterkin', 2, 1), ('Bhavna', 'Bakshi', 3, null), ('Alina', 'Balaiban', 4, 3), ('Indu', 'Chopra', 5, null), ('Jacky', 'Tweedie', 6, null), ('Martina', 'Alex', 7, 6), ('Emily', 'Edwards', 3, 2);

INSERT INTO employee_Role(title, salary, department_id)
VALUES ('Sales lead', 100000, 1), ('Sales person', 99000, 1), ('Senior Software engineer', 175000, 2), ('Software engineer', 130000, 2), ('Bookkeeper', 75000, 3), ('Paralegal team lead', 90000, 4), ('Lawyer', 250000, 4);

INSERT INTO employee_Dept(dept_name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;

SELECT dept_name FROM employee_Dept;

SELECT title FROM employee_Role