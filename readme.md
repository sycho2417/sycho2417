download
nodejs 
mysql
git

npm install express mysql2 cors

CREATE USER 'Hrpatil'@'%' IDENTIFIED BY 'hrpatil';
GRANT ALL PRIVILEGES ON collegedatabase.* TO 'Hrpatil'@'%';
FLUSH PRIVILEGES;

create table students
(ID int(10),Name varchar(20));

insert into students
values(1,"Hrutesh");

insert into students
values(2,"Aayush");
