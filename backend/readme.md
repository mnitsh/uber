## POST /api/v1/users/register

This endpoint registers a new user in the system.

### Description

Registers a new user with the required personal details and credentials.  
If validation passes and the user does not already exist, a new user is created.  
A JWT token is generated and sent back in an HTTP-only cookie along with the user details.

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John", // required, at least 2 characters
    "lastName": "Doe" // optional, if provided should be at least 3 characters as per model's minlength
  },
  "email": "john.doe@example.com", // required, must be in a valid email format
  "password": "password123", // required, at least 6 characters long
  "phone": "+1234567890" // optional, if provided must be a valid mobile phone number
}
```

### Validation Rules

- **fullName.firstName**:
  - Must not be empty.
  - Minimum length of 2 characters.
- **email**:
  - Must be in a valid email format.
- **password**:

  - Minimum length of 6 characters.

- **phone** (if provided):
  - Must be a valid mobile phone number.

### Response Codes

- **201 Created**  
  User registered successfully.  
  Response includes the user details and a JWT token set in an HTTP-only cookie.

- **400 Bad Request**  
  Validation failed (e.g., missing or invalid fields) or the user already exists.

- **409 Conflict**  
  When a user with the provided email already exists.

- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "60c72b2f3f1b2c001c8f9a2e",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2025-05-29T12:34:56.789Z",
    "updatedAt": "2025-05-29T12:34:56.789Z"
  },
  "token": "jwt.token.here"
}
```

### Notes

- The JWT token is sent as an HTTP-only cookie named `token` for security.
- You must use HTTPS in production when the `NODE_ENV` is set to `production` to ensure secure cookie transmission.
- Ensure that your environment variables (`TOKEN_SECRET`, `TOKEN_EXPIRY`, etc.) are set correctly in the `.env` file.

## POST /api/v1/users/login

This endpoint authenticates an existing user.

### Description

Logs in a user using the provided email and password credentials.  
On successful authentication, a JWT token is generated, set as an HTTP-only cookie, and returned along with the user data.

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com", // required, must be in a valid email format
  "password": "password123" // required, at least 6 characters long
}
```

### Validation Rules

- **email**:
  - Required.
  - Must be in a valid email format.
- **password**:
  - Required.
  - Minimum length of 6 characters.

### Response Codes

- **200 OK**  
  Login successful.  
  Response includes the user details and the JWT token set as an HTTP-only cookie.
- **400 Bad Request**  
  Validation failed (e.g., missing or invalid email and/or password).
- **401 Unauthorized**  
  Incorrect email or password.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Login successful",
  "user": {
    "_id": "60c72b2f3f1b2c001c8f9a2e",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2025-05-29T12:34:56.789Z",
    "updatedAt": "2025-05-29T12:34:56.789Z"
  },
  "token": "jwt.token.here"
}
```

### Notes

- The JWT token is sent as an HTTP-only cookie named `token` for security.
- Ensure that HTTPS is used in production when `NODE_ENV` is set to "production" to secure cookie transmission.# API Documentation
