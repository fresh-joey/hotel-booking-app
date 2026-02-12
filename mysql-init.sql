-- Create databases
CREATE DATABASE IF NOT EXISTS hotel_auth;
CREATE DATABASE IF NOT EXISTS hotel_service;
CREATE DATABASE IF NOT EXISTS booking_service;
CREATE DATABASE IF NOT EXISTS user_service;
CREATE DATABASE IF NOT EXISTS review_service;

-- Create non-root user for MySQL with limited privileges
CREATE USER IF NOT EXISTS 'hotel_user'@'%' IDENTIFIED BY 'hotel_password';

-- Grant privileges for all databases
GRANT ALL PRIVILEGES ON hotel_auth.* TO 'hotel_user'@'%';
GRANT ALL PRIVILEGES ON hotel_service.* TO 'hotel_user'@'%';
GRANT ALL PRIVILEGES ON booking_service.* TO 'hotel_user'@'%';
GRANT ALL PRIVILEGES ON user_service.* TO 'hotel_user'@'%';
GRANT ALL PRIVILEGES ON review_service.* TO 'hotel_user'@'%';

FLUSH PRIVILEGES;
