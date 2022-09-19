-- drops database if one has been created, creats the employee tracker database then uses database
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

-- table for employees
CREATE TABLE employee (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER(11),
manager_id INTEGER(11),
PRIMARY KEY (id) 
);

-- table for employee roles
CREATE TABLE employee_Role (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INTEGER(11),
PRIMARY KEY (id) 
);

-- table for employee department 
CREATE TABLE employee_Dept(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(30),
PRIMARY KEY (id) 
)