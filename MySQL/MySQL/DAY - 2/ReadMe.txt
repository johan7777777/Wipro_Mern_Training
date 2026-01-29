create table department (department_id int primary key , department_name varchar(100));
create table employees (employee_id int primary key , name varchar(100), department_id int , foreign key(department_id) references department(department_id));
 
insert into department values(10,"HR") ,(20,"IT") , (30,"Sales");
insert into employees values(101,"Jiya" ,10),(102,"Shubham" ,20),(103,"Rohit" ,30),(104,"Richa" ,10),(40,"Admin") ,(50,"Training");
 
         Select columns from table1 <alias name> inner join table 2 <alias name> on table1.fk = table2.pk
------------------------------------------------------------------------------------------------------------------------

create table empmanager (emp_id int , name varchar(50) , manager_id int);
 
 insert into empmanager (emp_id,name)values(1, "Niti");
insert into empmanager values(2, "jiya" , 1),(3, "Shubham" , 2),(4, "Richa" , 1); 
Select e1.name as employeename, e2.name as managername from empmanager e1 left join empmanager e2 on
e1.manager_id = e2.emp_id;    
----------------------------------------------------------------------------------------------------------   

 Dataset
Table 1: Employees
CREATE TABLE Employees (
    emp_id INT,
    emp_name VARCHAR(50),
    dept_id INT,
    manager_id INT
);
INSERT INTO Employees VALUES
(1, 'Amit', 10, NULL),
(2, 'Riya', 20, 1),
(3, 'Karan', 10, 1),
(4, 'Sneha', 30, 2),
(5, 'Rahul', NULL, 2);

Table 2: Departments
CREATE TABLE Departments (
    dept_id INT,
    dept_name VARCHAR(50)
);
INSERT INTO Departments VALUES
(10, 'IT'),
(20, 'HR'),
(40, 'Finance');
--------------------- Join Activities------------------
 INNER JOIN
 Activity:
Display employees who belong to a department.
 LEFT JOIN (Left Outer Join)
 Activity:
Display all employees even if they don’t belong to any department.
 RIGHT JOIN (Right Outer Join)
Activity:
Display all departments even if no employee works in them.
 FULL JOIN (Full Outer Join)
 Activity:
Display all employees and all departments, whether matched or not.
 SELF JOIN
 Activity:
Display employees and their managers.
 CROSS JOIN
 Activity:
Generate all possible employee–department combinations.

----------------------------------------------------------------------------------------------------------------------------------
In SQL, a subquery (or inner query) is a query nested within another statement. The primary distinction between a standard subquery and a correlated subquery lies in their dependency on the outer query and how many times they execute. 
Subquery (Non-Correlated)
A standard subquery is independent. It executes once before the outer query runs, and its result is then passed to the outer query. 
Execution: Runs once, independently.
Dependency: The outer query depends on the inner query's result.
Example: Finding all employees in a specific department name.
SELECT * FROM Employees
WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE Name = 'Sales');
 
 
 
Correlated Subquery
A correlated subquery is dependent on the outer query. It references one or more columns from the outer query, meaning it must be re-evaluated for every row processed by the outer query. 
Execution: Runs once for each row of the outer query.
Dependency: The inner query depends on values from the outer query.
Performance: Generally slower than non-correlated subqueries because of the repeated execution.
Example: Finding employees who earn more than the average salary of their own department.
 
Empid
Empname
Deptname
Salary
1
Dff
Sales
354
2
Df
Hr
54
3
 
Sales
3546
 
 
Hr
453
 
 
Sales
35
 
 
Admin
3
 
 
Hr
5
 
 
Admin
546
 
 
 
 
SELECT Name, Salary
FROM Employees e1
WHERE Salary > (SELECT AVG(Salary) FROM Employees e2 WHERE e1.DeptID = e2.DeptID);
 
 
 
 
 
Color
Size
Red
Small
Red
Medium
Red
Large
Green
Small
Green
Medium
Green
Large
Blue
Small
Blue
Medium
Blue
Large
Output of
Cross Join
 
Empid
Empname
Deptname
1
 
Sales
3
 
Sales
5
 
Sales
5000
Empid
Empname
Deptname
1
 
Hr
3
 
Hr
5

Subquery (Non-Correlated)
A standard subquery is independent. It executes once before the outer query runs, and its result is then passed to the outer query. 
Execution: Runs once, independently.
Dependency: The outer query depends on the inner query's result.
Example: Finding all employees in a specific department name.
sql
SELECT * FROM Employees 
WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE Name = 'Sales');
Use code with caution.
 
Correlated Subquery
A correlated subquery is dependent on the outer query. It references one or more columns from the outer query, meaning it must be re-evaluated for every row processed by the outer query. 
Execution: Runs once for each row of the outer query.
Dependency: The inner query depends on values from the outer query.
Performance: Generally slower than non-correlated subqueries because of the repeated execution.
Example: Finding employees who earn more than the average salary of their own department.
sql
SELECT Name, Salary 
FROM Employees e1 
WHERE Salary > (SELECT AVG(Salary) FROM Employees e2 WHERE e1.DeptID = e2.DeptID);

------------------------------------------------------------------------------------------------------------------

create table employees(emp_id int, fname varchar(40) , lname varchar(30) ,salary int , dept_id int);
 create table departments(dept_id int ,dept_name varchar(50));
 
insert into employees values(101,"Jiya" ,"D", 60000 , 10),(102,"Shubham", "S" , 50000 , 20),(103,"Rohit" , "K" , 67700,30),(104,"Richa" ,"K" , 40000 , 10);
insert into departments values(10,"HR") ,(20,"IT") , (30,"Sales"),(40,"Engineering"), (50,"Marketing");
 
Scalar Subquery : It returns exactly one column and one row --  single value -- like average
select fname , lname from employees where salary>(select avg(salary) from employees);

Multi Row  -- where it will return single column with multiple rows (like a list)  that we can achieve using
 IN, NOTIN, ANY ,ALL
 For eg :  select fname, lname from employees where dept_id in (select deptid from departments where dept_name in ('Sales' , 'Engineering'));

 select all from departments where no employees are assigned to them.
 SELECT *
FROM departments
WHERE dept_id NOT IN
(
  SELECT dept_id
  FROM employees
);
----------------------------------------------------------------------------------------------------------------------------------

Subquery Exercises
1. Find the names of employees who work in the same department.
2. Find the average salary of employees who work in the HR department.
SELECT AVG(salary)
FROM employees
WHERE department_id = (
    SELECT department_id FROM departments WHERE department_name='HR'
);
3. List all customers who have placed more than 5 orders.
SELECT customer_name
FROM customers
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
    GROUP BY customer_id
    HAVING COUNT(*) > 5
);
4. Retrieve the product name and price of the most expensive product.
SELECT product_name, price
FROM products
WHERE price = (SELECT MAX(price) FROM products);
5. Find employees who earn more than the average salary in their department.
6. Get the names of customers who have never placed an order.
7. List all employees who were hired after the average hire date of all employees.
8. Find the total sales for each customer, using a subquery to get sales per order.
9. Get the name of the supplier who provides the most expensive product.
10. Find departments where the maximum salary is greater than $50,000.
________________________________________
Correlated Subquery Exercises
1. List all employees who earn more than the average salary in their department.
2. Retrieve the product names that cost more than the average price of their product line.
3. List customers who placed an order in the last 30 days.
4. Find employees who have more sales than the average sales of their department.
5. List departments that have more than 3 employees.
6. Retrieve the customer names where the total amount of their orders exceeds $10,000.
7. Find products where the price is higher than the average price of products in the same category.
8. List suppliers that provide more than 3 products.
9. Find employees who have been hired after all other employees in their department.
10. List customers who have placed more orders than the average number of orders placed by all customers.
________________________________________
Exercises Using IN, ANY, ALL, and EXISTS
1. List all customers who have placed at least one order.
2. Find employees who earn more than any employee in the HR department.
3. List products where the price is less than all prices of products in the "Electronics" category.
4. Retrieve employees who work in departments that are in "New York" or "Chicago".
5. Find employees who earn more than all employees in the Sales department.
6. List all products that have been ordered by at least one customer.
7. Find customers who have placed more orders than the average number of orders placed by customers.
8. Retrieve employees who earn more than the average salary in the company.
9. List employees who work in the same city as their department's office.
10. Find customers who have ordered every product in the "Furniture" category.
________________________________________

Datasets
•	employees table: contains employee information (employee_id, employee_name, department_id, salary, hire_date, etc.).
•	departments table: contains department information (department_id, department_name, location).
•	customers table: contains customer information (customer_id, customer_name, etc.).
•	orders table: contains order details (order_id, customer_id, order_date, total_amount, etc.).
•	products table: contains product details (product_id, product_name, category_id, price, supplier_id).

------------------------------------------------------------------------------------------------------------------------------
select count(*) from employees group by dept_id;
select avg(salary) from employees group by dept_id;
select day(current_date());
select extract(day from'2026-01-28');
select extract(month from'2026-01-28');
select extract(month from'2026-01-28');