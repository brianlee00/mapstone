drop database if exists cyburbia;
create database cyburbia;

use cyburbia;

create table location (
	location_id int primary key auto_increment,
    address varchar(200) not null,
    city varchar(50) not null,
    state varchar(3) not null
);

create table developer (
	developer_id int primary key auto_increment,
    `name` varchar(150) not null,
    email varchar(150) not null,
    location_id int not null,
    constraint fk_developer_location_id
		foreign key (location_id)
        references location(location_id)
);

create table agency (
	agency_id int primary key auto_increment,
    `name` varchar(150) not null,
    email varchar(150) not null,
    location_id int not null,
    constraint fk_agency_location_id
		foreign key (location_id)
        references location(location_id)
);

create table project (
	project_id int primary key auto_increment,
    location_id int not null,
    constraint fk_project_location_id
		foreign key (location_id)
        references location(location_id),
	agency_id int not null,
	constraint fk_project_agency_id
		foreign key (agency_id)
        references agency(agency_id),
	sq_ft int,
    `type` varchar(100) not null,
    `status` varchar(100) not null,
    `description` varchar(500) not null,
    budget decimal(12,2)
);

create table project_developer (
	developer_id int not null,
    constraint fk_project_developer_developer_id
		foreign key (developer_id)
        references developer(developer_id),
	project_id int not null,
    constraint fk_project_developer_project_id
		foreign key (project_id)
        references project(project_id)
);