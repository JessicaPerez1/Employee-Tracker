-- to pre populate my database

INSERT INTO department (department_name)
VALUES ("Sales"), ("HR"), ("Marketing"), ("IT"), ("Maintenance"), ("Accounting"), ("Engineering"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 110000.00, 1), ("Vice President", 100000.00, 2), ("Director", 90000.00, 3), ("Assistant Manager", 70000.00, 4) , ("Technician", 60000.00, 5), ("Tax Accountant", 72000.00, 6), ("Junior Developer", 65000.00, 7), ("Bookkeeper", 55000.00, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marian", "Gude", 1, null), ("Mike", "Haber", 3, null), ("Jessica", "Perez", 8, null), ("LAuren", "Adams", 3, null);


Select employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name, employee_m.first_name as manager_firstname, employee_m.last_name as manager_lastname
from employee 
join roles on employee.role_id = roles.id
join department on roles.department_id = department.id
Left join employee as employee_m on  employee.manager_id  = employee_m.id;

select * from department;
select * from roles;
select * from employee;