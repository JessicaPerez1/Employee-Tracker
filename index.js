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
function readProduct() {
  //   console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

//PROMPTS
//WELCOME PROMPT
//what would you like to do?
//view all employees
//view all employees by department
//view all employees by manager
//add an employee
//remove an employee
//update an employee's role
//update an employees manager
//update an employees department

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
          "view all employees by department",
          "view all employees by manager",
          "add an employee",
          "create a department",
          "remove an employee",
          "update an employee's role",
          "update an employees manager",
          "update an employees department",
          "exit",
        ],
      },
    ])
    .then(function (reply) {
      if (reply.action === "view all employees") {
        viewAllEmployees();
      } else if (reply.action === "view all roles") {
        viewAllRoles();
      } else if (reply.action === "view all employees by department") {
        viewEmployeesByDepartment();
      } else if (reply.action === "view all employees by manager") {
        viewEmployeesByManager();
      } else if (reply.action === "add an employee") {
        addEmployee();
      } else if (reply.action === "add a department") {
        addDepartment();
      } else if (reply.action === "remove an employee") {
        removeEmployee();
      } else if (reply.action === "update an employee's role") {
        updateEmployeeRole();
      } else if (reply.action === "update an employees manager") {
        updateEmployeeManager();
      } else if (reply.action === "update an employees department") {
        updateEmployeeDepartment();
      } else {
        connection.end();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//if add is chosen
//prompt with questions : new employees name, last name, role (choice list of job titles), whos the manager(choice list of managers)

//update an employees

//if remove an employee
//prompt with which employee would you like to remove  - display full list of employee name
//console message "this employee has been removed from the db"

//CRUD
// Create helper Functions to use in the .then with inq Prompts as callbacks
//READ FUNCTIONS =====> allow user to
//read departments function viewAllEmployees
//read roles function viewRoles
//read employees viewEmployees
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}
function viewEmployeesByDepartment() {
  //create an empty array for department
  let departmentArray = [];
  //query all info from department(department name)
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //for each element of the response, push department name to the department array
    for (var i = 0; i < res.length; i++) {
      departmentArray.push(res[i].department_name);
    }
    //console.log(departmentArray);
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
        //console.log(departmentChoice);
        //query info from employee + department tables
        connection.query(
          `SELECT department_name, first_name, last_name FROM employee, department, role WHERE department.id = department_id AND role.id = role_id`,
          //   [departmentChoice],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            const departmentName = [];
            for (i = 0; i < res.length; i++) {
              if (res[i].department_name === departmentChoice) {
                departmentName.push(res[i].first_name + " " + res[i].last_name);
              }
            }
            console.log(departmentName);
          }
        );
        mainMenu();
      });
  });
}

function viewEmployeesByManager() {}

//function add employees
function addEmployee() {
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
        choices: function () {
          var roleArray = [];
          for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
          }
          return roleArray;
        },
        message: "Choose the role",
      },
      {
        name: "manager",
        type: "rawlist",
        choices: function () {
          var managerArray = [];
          for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].employee);
          }
          return managerArray;
        },
        message: "Choose the manager",
      },
    ])
    .then(function (reply) {
      console.log("Adding a new employee...\n");
      //query role
      //query manager
      connection
        .query(
          "INSERT INTO employee SET ?",
          {
            first_name: reply.firstname,
            last_name: reply.lastname,
            role_id: reply.role,
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "employee added \n");
          }
        )
        .catch(function (err) {
          console.log(err);
        });
    });
  //mainMenu();
}

function addDepartment() {
  mainMenu();
}
function removeEmployee() {
  mainMenu();
}

function updateEmployeeRole() {
  mainMenu();
}

function updateEmployeeManager() {
  mainMenu();
}
function updateEmployeeDepartment() {
  mainMenu();
}

//function create roles

//UPDATE FUNCTION ======> allow user to
//update employee role
