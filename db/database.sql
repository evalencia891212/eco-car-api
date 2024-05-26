create database if not exist eco-car;
CREATE TABLE public.employees (
	employee_id int auto_increment NOT NULL Primary key,
	user_id int NULL,
	employee_number varchar NULL,
	"name" varchar(50) NULL,
	last_name varchar(50) NULL,
	mother_lastname varchar(50) NULL,
	neighborhood varchar(100) NULL,
	street_name varchar(100) NULL,
	outdoor_number varchar(30) NULL,
	interior_number varchar(30) NULL,
	company_mail varchar(100) NULL,
	personal_mail varchar(100) NULL,
	"location" varchar(100) NULL,
	active boolean NULL,
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;