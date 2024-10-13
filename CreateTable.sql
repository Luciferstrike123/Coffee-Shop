CREATE TABLE food (
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    name VARCHAR(100) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE  -- Foreign key referencing users
);

create table users (
 id serial primary key,
 username varchar(50) not null,
 email varchar(100) not null unique,
 create_at timestamp default current_timestamp
)




select * from food
select * from users

update food 
set user_id = 3
where cost = 5



