-- sql script


CREATE DATABASE IF NOT EXISTS Phantom_db;
       CREATE USER IF NOT EXISTS 'Phantom_user'@'localhost' IDENTIFIED BY 'Phantom_pwd123@';
              GRANT ALL PRIVILEGES ON Phantom_db.* TO 'Phantom_user'@'localhost';
                                      GRANT SELECT ON performance_schema.* TO 'Phantom_user'@'localhost';
FLUSH PRIVILEGES;