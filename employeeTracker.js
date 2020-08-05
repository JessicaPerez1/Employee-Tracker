//DEPENDENCIES
//require mysql
var mysql = require("mysql");
//require inquirer
var inquirer = require("inquirer");
//require console.table
var consoleTable = require("console.table");
//require mysql
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeesDB",
});
//CHECK CONNECTION IS WORKING
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProduct();
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

function welcomePrompt(response) {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                "view all employees", 
                "view all employees by department", 
                "view all employees by department", 
                "view all employees by manager", 
                "add an employee", 
                "remove an employee", 
                "update an employee's role", 
                "update an employees manager",
                "update an employees department" ],
            },
        ])
        .then(function (reply) {
            if (reply.choice === "Add Employee") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is the employee's first name?",
                            name: "firstName",
                        },
                        {
                            type: "input",
                            message: "What the employee's last name?",
                            name: "lastName",
                        },
                        {
                            type: "input",
                            message: "What is the employee's role ID?",
                            name: "role",
                        },
                        {
                            type: "input",
                            message: "What is the employee's manager's ID?",
                            name: "managerId",
                        },
                    ])
                    .then(function (addEmployeeReply) {
                        var newEmployee = new Employee(
                            addEmployeeReply.firstName,
                            addEmployeeReply.lastName,
                            addEmployeeReply.role,
                            addEmployeeReply.managerId
                        );
                        console.log(newEmployee);
                        // employeeId = employeeId++;
                        addEmployee(newEmployee);
                        // newTeamMember();
                    })

//if add is chosen
//prompt with questions : new employees name, last name, role (choice list of job titles), whos the manager(choice list of managers)

//update an employees

//if remove an employee
//prompt with which employee would you like to remove  - display full list of employee name
//console message "this employee has been removed from the db"

//CRUD
// Create helper Functions to use in the .then with inq Prompts as callbacks
//READ FUNCTIONS =====> allow user to
//read departments
//read roles
//read employees

//CREATE FUNCTIONS ======> allow user to
//function create department
//function create roles
//function create employees

//UPDATE FUNCTION ======> allow user to
//update employee role
