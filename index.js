const fs = require('fs');
const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

let employees = [];
let roles = [];

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected.');
  fetchInitial();
  employeeUpdate();
});

const fetchInitial = () => {
  employees = [];
  const query = 'SELECT first_name FROM employee';
  db.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name }) => {
      employees.push(first_name);
    });
  });

  roles = [];
  const query2 = `SELECT title FROM employee_Role`;
  db.query(query2, (err, res) => {
    if (err) throw err;
    res.forEach(({ title }) => {
      roles.push(title);
    });
  });
};

const employeeUpdate = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View Departments',
          'View Roles',
          'View all Employees',
          'Add Departments',
          'Add Roles',
          'Add Employee',
          'Update Employee Role',
        ],
      },
    ])
    .then((answer) => {
      console.log("");
      console.log("");
      console.log("");
      switch (answer.choice) {
        case 'View all Employees':
          viewAllEmployees();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Departments':
          addDepartment();
          break;

        case 'Add Roles':
          addRoles();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;
      }
    });
};

const viewDepartments = () => {
  const query = `SELECT dept_name FROM employee_Dept`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeUpdate();
  });
};

const viewAllEmployees = () => {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeUpdate();
  });
};

const viewRoles = () => {
  roles = [];
  const query = `SELECT title FROM employee_Role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ title }) => {
      roles.push(title);
    });
    console.table(res);
    employeeUpdate();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is employees first name?',
        name: 'firstName',
      },
      {
        type: 'input',
        message: 'What is employees last name?',
        name: 'lastName',
      },
      {
        type: 'input',
        message: 'What is employees role id?',
        name: 'roleId',
      },
      {
        type: 'input',
        message: 'What is employees manager id?',
        name: 'managersId',
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managersId,
        },
        (err) => {
          if (err) throw err;
          console.table(answers);
          employeeUpdate();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What department would you like to add?',
        name: 'newDept',
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employee_Dept SET ?`,
        {
          dept_name: answers.newDept,
        },
        (err) => {
          if (err) throw err;
          console.log('Added new Department');
          console.table(answers);
          employeeUpdate();
        }
      );
    });
};

const addRoles = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'newRole',
      },
      {
        type: 'input',
        message: 'What is the salary?',
        name: 'salary',
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employee_Role SET ?`,
        {
          title: answers.newRole,
          salary: answers.salary,
        },
        (err) => {
          if (err) throw err;
          console.log('Added new Role');
          console.table(answers);
          employeeUpdate();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employees,
        name: 'employeeUpdate',
      },
      {
        type: 'list',
        message: 'What would you like for the new role',
        choices: roles,
        name: 'newRole',
      },
    ])
    .then((answers) => {
      db.query(
        `SELECT id FROM employee_Role WHERE title = ?;`,
        [answers.newRole],
        (err, res) => {
          if (err) throw err;
          db.query(
            `UPDATE employee SET role_id = ? WHERE first_name = ?`,
            [ res[0].id, answers.employeeUpdate,
            ],
            (err) => {
              if (err) throw err;
              console.log('Updated Employee Role');
              console.table(answers);
              employeeUpdate();
            }
          );
        }
      )
     
    });
};

