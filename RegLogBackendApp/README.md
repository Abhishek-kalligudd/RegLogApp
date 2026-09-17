# RegLogBackendApp

This is the Spring Boot backend for the Registration and Login application.

## Requirements
- Java 17
- Spring Boot 3.x
- MySQL 8

## Setup and Configuration

1. **MySQL Database**: Ensure MySQL is running on `localhost:3306`.
2. **Database Creation**: The database `reglog_db` will be created automatically if it doesn't exist, provided the credentials have adequate privileges. Otherwise, create it manually:
   ```sql
   CREATE DATABASE reglog_db;
   ```
3. **Environment Variables**: You can configure the application by overriding these environment variables in your environment or IDE, or modifying `src/main/resources/application.properties`:
   - `DB_USERNAME` (default: root)
   - `DB_PASSWORD` (default: root)
   - `JWT_SECRET` (default provided)
   - `JWT_EXPIRATION` (default: 3600000 ms = 1 hour)

## How to Run
Use Maven to run the application:
```bash
mvn spring-boot:run
```
The application will start on port 8080.

## API Endpoints
- `POST /api/reg` - Register a new user
- `POST /api/login` - Authenticate user and receive HTTP-only JWT cookie
- `POST /api/logout` - Clear cookie and invalidate session
- `GET /api/user/me` - Get current authenticated user details (Protected)
