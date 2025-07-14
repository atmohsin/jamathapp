USE [master]
GO

/****** Object:  Database [honavar_jamaat]    Script Date: 5/4/2025 5:15:43 PM ******/
CREATE DATABASE [honavar_jamaat]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'honavar_jamaat', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQL\MSSQL\DATA\honavar_jamaat.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'honavar_jamaat_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQL\MSSQL\DATA\honavar_jamaat_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO


CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    rolename varchar(20)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	firstname varchar(20) NOT NULL,
	lastname varchar(20)  NOT NULL,
	email varchar(20)  NOT NULL,
	mobileno int  NOT NULL,
	password varchar(20)  NOT NULL,
	roleid int,
	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	createdby varchar(20) DEFAULT NULL,
	updatedby varchar(20) DEFAULT NULL,
	constraint fk_users_roles
     foreign key (roleid) 
     REFERENCES roles (id)
);

CREATE  FUNCTION update_updatedat_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedat = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updatedat
    BEFORE UPDATE
    ON
        users
    FOR EACH ROW
EXECUTE PROCEDURE update_updatedat_users();


CREATE TABLE residents (
    id SERIAL PRIMARY KEY,
    firstname varchar(50),
	middlename varchar(50),
	lastname varchar(50),
	dateofbirth date,
	mobileno varchar(15),
	aadhaarno varchar(16),
	voterid varchar(10),
	address text,
	relationid int,
	relation varchar(20)
);


CREATE TABLE nonresidents (
    id SERIAL PRIMARY KEY,
    firstname varchar(50),
	middlename varchar(50),
	lastname varchar(50),
	mobileno varchar(15),
	place text	
);

CREATE TABLE source (
    id SERIAL PRIMARY KEY,
    source varchar(50)
);

CREATE TABLE donation (
	id SERIAL PRIMARY KEY,
    donorid int,
    amount   int,
    transdate timestamp default NULL,
    sourceid int
);

CREATE TABLE spends (
    id SERIAL PRIMARY KEY, 
    spenddate_time timestamp default NULL,
	amount int,
    reason varchar(100)
);

CREATE TABLE ledger (
	id SERIAL PRIMARY KEY,
	donationid int,
	donationamount int,
    spendid int,
    spendamount int,    
	balanceamount int,
	calcdatetime timestamp not null
);

insert into roles (rolename) values ('Role1')
insert into roles (rolename) values ('Role2')


    
insert into users (firstname,lastname,email,mobileno,password,roleid) values('admin','admin',admin@admin.com','123456578','admin123',1)

