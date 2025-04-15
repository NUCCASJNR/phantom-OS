-- sql script


CREATE DATABASE IF NOT EXISTS LMS_db;
       CREATE USER IF NOT EXISTS 'LMS_user'@'localhost' IDENTIFIED BY 'LMS_pwd123@';
              GRANT ALL PRIVILEGES ON LMS_db.* TO 'LMS_user'@'localhost';
                                      GRANT SELECT ON performance_schema.* TO 'LMS_user'@'localhost';
FLUSH PRIVILEGES;