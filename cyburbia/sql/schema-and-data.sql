drop database if exists cyburbia;
create database cyburbia;

use cyburbia;

create table location (
	location_id int primary key auto_increment,
    address varchar(200) not null,
    city varchar(50) not null,
    state varchar(3) not null,
    zip_code varchar(5) not null
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

-- data
insert into location (location_id, address, city, state, zip_code) values
	(1, '368 Fulton St', 'Brooklyn', 'NY', '11201'),
    (2, '4208 28th St', 'Long Island City', 'NY', '11101'),
    (3, '114 Central Ave', 'Staten Island', 'NY', '10301'),
    (4, '826 Market St', 'Philadelphia', 'PA', '19107'),
    (5, '1201 Callowhill St', 'Philadelphia', 'PA', '19123'),
    (6, '153 N 15th St', 'Philadelphia', 'PA', '19102'),
	(7, '244 A St', 'Boston', 'MA', '02210'),
    (8, '1910 Dorchester Ave', 'Boston', 'MA', '02124'),
    (9, '22 Spruce St', 'Quincy', 'MA', '02171');

insert into agency (agency_id, `name`, email, location_id) values
	(1, 'New York Urban Development Authority', 'contact@nyuda.org', 1),
    (2, 'PlanPHL Development', 'contact@planphila.org', 4),
    (3, 'Greater Boston Planning Agency', 'contact@gbpa.org', 7);
    
insert into developer (developer_id, `name`, email, location_id) values
	(1, 'Gotham City Real Estate, LLC', 'contact@gothamre.com', 2),
    (2, 'Building Brotherly Love, Inc', 'contact@bbl.com', 5),
    (3, 'Design+Build Associates', 'contact@designbuild.com', 8);
    
insert into project (project_id, location_id, agency_id, sq_ft, `type`, `status`, `description`, budget) values
	(1, 3, 1, 10000, 'MIX', 'REV', '5 story mixed-use building; 1000 sq ft commercial on ground floor, 4 stories of apartments above', 3000000.00),
    (2, 6, 2, 30000, 'RES', 'CON', '12 story apartment building: 1, 2, and 3br units', 15000000.00),
    (3, 9, 3, 100000, 'COM', 'APP', '8 story office building, contact developer for leasing opportunities', 20000000.00);
    



