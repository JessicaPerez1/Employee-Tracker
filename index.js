//DEPENDENCIES
//require mysql
var mysql = require("mysql");
//require inquirer
var inquirer = require("inquirer");
//require console.table
const cTable = require("console.table");
//require mysql
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1@Rootuser",
  database: "employeesDB",
});
//CHECK CONNECTION IS WORKING
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});
//test if my DB info is working
function mainMenu() {
  //   console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}
//BONUS
// Add departments
//Add roles
//add employees
//View departments, roles, employees
//Update employee roles

function mainMenu(response) {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "view all employees",
          "view all roles",
          "view all departments",
          "add an employee",
          "add roles",
          "add departments",
          "view all employees by department",
          "update an employee's role",
          "exit",
          //Update employee managers
          //View employees by manager
          //Delete departments, roles, and employees
        ],
      },
    ])
    .then(function (reply) {
      if (reply.action === "view all employees") {
        viewAllEmployees();
      } else if (reply.action === "view all roles") {
        viewAllRoles();
      } else if (reply.action === "view all departments") {
        viewAllDepartments();
      } else if (reply.action === "add an employee") {
        addEmployee();
      } else if (reply.action === "add roles") {
        addRoles();
      } else if (reply.action === "add departments") {
        addDepartments();
      } else if (reply.action === "view all employees by department") {
        viewEmployeesByDepartment();
      } else if (reply.action === "update an employee's role") {
        updateEmployeeRole();
      } else if (reply.action === "exit") {
        connection.end();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//DONE
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}
//DONE
function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}
//DONE
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}
//DONE
//prompt with :name, last name, role (choice list of job titles), whos the manager(choice list of managers)
function addEmployee() {
  let roleArray = [];
  //let managerArray = [];
  connection.query(
    "SELECT id, title FROM roles",
    //"SELECT manager_id FROM employee",
    function (err, roles) {
      if (err) throw err;
      //for each element of the response, push to array
      for (var i = 0; i < roles.length; i++) {
        roleArray.push(roles[i].title);
      }
      console.log(roles);
      //for (var i = 0; i < res.length; i++) {
      // managerArray.push(res[i].employee);
      //}
      inquirer
        .prompt([
          {
            name: "firstname",
            type: "input",
            message: "Type in the first name",
          },
          {
            name: "lastname",
            type: "input",
            message: "Type in the last name",
          },
          {
            name: "role",
            type: "rawlist",
            message: "Choose the role",
            choices: roleArray,
          },
        ])
        .then(function (reply) {
          let roleId;
          console.table("Adding a new employee...\n");
          roles.forEach((role) => {
            //console.log(role.title === reply.role);
            if (role.title === reply.role) {
              console.log("It's a match", role.id);
            }
            roleId = role.id;
          });
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: reply.firstname,
              last_name: reply.lastname,
              role_id: roleId,
            },
            function (err, res) {
              if (err) throw err;
              console.table(res.affectedRows + "employee added \n");
              mainMenu();
            }
          );
        });
    }
  );
}

//DONE
function addRoles() {
  let departmentsArray = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentsArray.push(res[i].department_name);
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "Enter a new role Title",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the Salary for this role",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department is this role in?",
          choices: departmentsArray,
        },
      ])
      .then(function (reply) {
        let deptId;
        res.forEach((department) => {
          if (department.department_name === reply.department_id) {
            console.log(department.id);
          }
          deptId = department.id;
        });
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: reply.role,
            salary: reply.salary,
            department_id: deptId,
          },
          function (err, res) {
            if (err) throw err;
            console.table("New role added.");
          }
        );
        mainMenu();
      });
  });
}
// function addRoles() {
//   inquirer
//     .prompt([
//       {
//         name: "newroleTitle",
//         type: "input",
//         message: "Enter a new role title",
//       },
//       {
//         name: "newroleSalary",
//         type: "input",
//         message: "Enter the new role Salary",
//       },
//     ])
//     .then(function (reply) {
//       let newroleArray = [];
//       let newSalary = [];
//       console.table("Adding a new role...\n");
//       console.table("Adding a new salary...\n");
//       newroleArray.push(reply.newroleTitle);
//       newSalary.push(reply.newroleSalary);
//       console.log(newroleArray);
//       console.log(newSalary);
//       //figure out how to
//     });
// }
//DONE
function addDepartments() {
  inquirer
    .prompt([
      {
        name: "newdepartment",
        type: "input",
        message: "Enter a new department name",
      },
    ])
    .then(function (reply) {
      let newDepartment = [];
      console.table("Adding a new department...\n");
      newDepartment.push(reply.newdepartment);
      //console.log(newDepartment);
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: reply.newdepartment,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res.affectedRows + " department added \n");
          mainMenu();
        }
      );
    });
}

//DONE
function viewEmployeesByDepartment() {
  //create an empty array for department
  let departmentArray = [];
  //query all info from department(department name)
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //console.log(res);
    //for each element of the response, push department name to the department array
    for (var i = 0; i < res.length; i++) {
      departmentArray.push(res[i].department_name);
    }
    console.log(departmentArray);

    //prompt the user
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department's employees do you want to see?",
          choices: departmentArray,
          name: "department",
        },
      ])
      .then(function (reply) {
        //save the user reply to a var
        const departmentChoice = reply.department;
        console.log(departmentChoice);
        //query info from employee + department tables
        connection.query(
          `SELECT department_name, first_name, last_name FROM employee, department, roles WHERE department.id = department_id AND roles.id = role_id`,
          //   [departmentChoice],
          function (err, res) {
            if (err) throw err;
            //console.log(res);
            const departmentName = [];
            for (i = 0; i < res.length; i++) {
              if (res[i].department_name === departmentChoice) {
                departmentName.push(res[i].first_name + " " + res[i].last_name);
              }
            }
            console.table(departmentName);
            mainMenu();
          }
        );
      });
  });
}

function viewEmployeesByManager() {}
//to show name of manager, connect the manager id to an employee id
//join manager on employee.manager_id = employee.id

function updateEmployeeRole() {
  mainMenu();
}
