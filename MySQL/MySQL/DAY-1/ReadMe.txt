It's an open source relational database management system to store the data in the
Form of tables ( Rows & Columns)


Banking 
E-shopping
ERP
Retail(Inventory management)


Database
Tables
Rows
Columns
Primary Key  -- UNIQUE VALUES YOU WANT TO STORE



Database --- is a collection of multiple tables of its similar type of database

					YourBank
					







Create database <dbname>

Use <dbname>    to select the database on which you have to work on


CREATE DATABASE EMS;
EMP_ID	NAME	DEPT	SALARY
101	NITI	TRAINING	45000
			
 CREATE TABLE EMPLOYEES(EMP_ID INT PRIMARY KEY, NAME VARCHAR(50), DEPT VARCHAR(30), SALARY INT);





INSERT INTO <TABLENAME> VALUES() --- USE TO INSERT THE VALUES IN A TABLE
SELECT * FROM <TABLENAME> -- USE TO VIEW THE RECORDS

Ems -- YOU WANT TO CREATE , UPDATE , DELETE AND MODIFY THE DATA SO PERFORMING THESE OPERATIONS
WE HAVE COMMANDS AS BELOW:

CREATE --- INSERT INTO
VIEW / READ -- SELECT * FROM
MODIFY -- UPDATE <TABLE NAME> SET  <NEW DATA> WHERE <CONDITION>
DELETE --- DELETE  FROM <TABLE NAME> WHERE <CONDITION>


ACTIVITY : PERFORM THE DATA BASE AND CREATE A TABLE AS PRODUT AND ADD RECORDS IN IT
 AND THEN SHOW ALL PRODUCTS




MAIN CATEGORIES OF COMMANDS

DDL  : DATA DEFINITION LANGUAGE  ( When it is related to your table)
	Create , Alter , Drop and Truncate 
	CREATE TABLE EMPLOYEES(EMP_ID INT PRIMARY KEY, NAME VARCHAR(50), DEPT VARCHAR(30), SALARY INT);
	Alter table employees add email varchar(30);
	Drop table employees;
	Truncate employees;  Use to delete everything in the table  without having any condition
	
DML : DATA MANIPULATION LANGUAGE  (When it is related to your table data (rows)
	 Insert , Update , Delete 
	INSERT INTO EMPLOYEES VALUES(103,"JIYA","TRAINING",55000);
	UPDATE EMPLOYEES SET DEPT="OPERATIONS"  WHERE EMP_ID=103;
	DELETE FROM EMPLOYEES WHERE EMP_ID=103;   use to delete a single or more than one record  based on condition
	
DQL : DATA QUERY LANGUAGE ( Performing the queries on your data )
	Select 
	Select * from employee;
	Select * from employees where salary>5000;
	Select * from employees order by salary desc;
	
TCL : TRANSACTION CONTROL LANGUAGE
         to ensure the data consistency using transactions
	Commit , Rollback , savepoint
	
DCL : Data Control Language
	Grant , Revoke
	
	
Some of the SQL Select queries 

select * from employees;
 select 1+1 as addition;
select now();
select concat("new", "delhi")as city;
 select * from employees order by emp_id desc;
 select * from employees order by emp_id desc limit 1;

The query gets evaluated using 
From ----> select ----> orderby

	1- Let's say if you want to display the last name in descending order and then the first name in ascending

Niti dwivedi
Komal sharma
Jiya dwivedi
Jatin dwivedi
Lovely sharma


 select * from employees order by lastname desc firstname asc;

Dwivedi Jatin
Dwivedi Jiya
Dwivedi Niti
Sharma Komal
Sharma Lovely

	2- To display the total salary after increment 1000 as a bonus

 Select  emp_id ,name,dept ,salary+1000 as totalbonusedsal from employees order by totalbonusedsal;
 Select  emp_id ,name,dept ,salary+1000 as totalbonusedsal from employees order by totalbonusedsal desc limit 1;

3 - display the salaries of all employees whose department is not in training and operations 
select name ,salary , dept from employees where dept not in('training','admin');

	4. display the salaries of all employees whose department is unique

select distinct dept from employees;

Don’t use if you want to display distinct depart because in this case name and salary are not same so if name and salary is same then it will work
select distinct dept ,name, salary from employees where dept in('training','admin');



5 - display the count of unique departments

And may also count the unique department we have below query 
select count(distinct dept)  from employees;

6 - display the data where department is training or salary is greater than 25000 

select * from employees where dept = 'training' or salary>=25000;

	7. Like operator to get the name starts with or ends with using wild card characters  % . __(underscore)

select name ,emp_id, dept,salary from employees where name like "____%N";
select name ,emp_id, dept,salary from employees where name like "%di";
select name ,emp_id, dept,salary from employees where name like "NI%";
select name ,emp_id, dept,salary from employees where name like "____n%";


Insert 
create table department (dept_id int auto_increment primary key , dept_name varchar(20));
 insert into department (dept_name) values("OPERATIONS");

select last_insert_id();  // to check the last incremented value;
truncate table department;   // to delete the entire data 


Alter commands

create table department ( dept_id int primary key , emp_id int not null, foreign key(emp_id) references employees(emp_id));
 alter table department add s_no int auto_increment primary key;
// to change a table name
rename table department to hr_department;

// add a new column name
alter table department add column dept_name varchar(30) after dept_id;

// drop any column from a table
 alter table employees drop column email;

// rename the column name
alter table employees rename column dept to deptname;

// modifying the width or datatype of a column
 alter table employees modify column deptname varchar(100);


Constraints :

Different types of constraints we can apply on a table columns which enforcing the data validation

Types of constraints are below:

Default
Unique
Not Null
Check


Create table cart_items(item_id int auto_increment primary key,
name varchar(255) not null,quantity int not null,
price dec(5,2) not null,
sales_tax dec(5,2) not null default 0.1,
check(quantity> 0),
check (sales_tax >=0));