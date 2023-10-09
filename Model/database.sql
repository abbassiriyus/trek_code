create table users(
    "id" serial primary key,
    "email" VARCHAR(120) not null,
    "password" VARCHAR(100) not null,
    "address" VARCHAR(1024),
    "firstname" VARCHAR(120) default 'Firstname' not null,
    "patronimic" VARCHAR(120) default 'Patronimic' not null,
    "lastname" VARCHAR(120) default 'Lastname' not null,
    "admin" boolean default false not null,
    "manager" boolean default false not null,
     UNIQUE(email),
    "time_create" timestamp  default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);


create table orders(
   "id" serial primary key,
   "trek_id" VARCHAR(50) not null, 
   "sender" integer default 1 not null, 
   "time_create" timestamp  default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null
)
create table orders_address(
   "id" serial primary key,
   "orders_id" integer not null, 
   "sender" integer default 1 not null, 
   "time_create" timestamp  default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null
)

create table zakaz(
   "id" serial primary key,
   "status" integer default 1 not null, 
   "menegerid" integer,
   "deckription" text,
   "creator" integer default 1 not null, 
   "oredersid" integer default 1 not null,
   "time_create" timestamp  default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null
)
create table points(
   "id" serial primary key,
   "status" integer default 1 not null, 
   "zakaz_id" integer default 1 not null, 
   "time_create" timestamp  default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null
)