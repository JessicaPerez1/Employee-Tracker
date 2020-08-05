-- create tables here
-- link seed.sql to extract info

DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department (
    -- id points to department id in role table
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  -- foreign key that refers to primary id key in department table
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  --foreign key that refers to primary id key in role table
  FOREIGN KEY (role_id) REFERENCES role(id),
  --foreign key that refers to which primary key in what table????
  manager_id INT NULL,
  PRIMARY KEY (id)
);
