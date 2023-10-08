create table users(
    "id" serial primary key,
    "email" VARCHAR(120) not null,
    "password" VARCHAR(100) not null,
    "address" VARCHAR(1024) ,
    "admin" boolean default false not null,
    "manager" boolean default false not null,
     UNIQUE(email),
    "time_create" timestamp  default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);


create table orders(
   "id" serial primary key,
   "trackId" integer not null, 
   "sender" integer default 1 not null, 
   "time_create" timestamp  default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null
)
create table ordersaddress(
   "id" serial primary key,
   "ordersid" integer not null, 
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