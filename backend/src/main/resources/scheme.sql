CREATE database if not exists test_db;

CREATE TABLE if not exists user(
    id LONG PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    age INT
);

INSERT INTO user values (null,'kim',23);
INSERT INTO user values (null,'chae',30);