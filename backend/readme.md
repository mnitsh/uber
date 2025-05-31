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

## GET /api/v1/users/logout

This endpoint logs out an authenticated user.

### Description

Logs out the current user by clearing the JWT token cookie and blacklisting the token to prevent its further usage. The token is expected either in an HTTP-only cookie or in the `Authorization` header.

### Request Details

- **Method:** GET  
- **Authentication:** Required (the token must be provided either as an HTTP-only cookie named `token` or as a Bearer token in the `Authorization` header).
- **Request Body:** None

### Response Codes

- **200 OK**  
  Logout successful.  
  Response includes a confirmation message.
- **401 Unauthorized**  
  If the token is missing, invalid, or already blacklisted.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Logout successful"
}
```

### Notes

- The endpoint first clears the HTTP-only cookie `token` from the client.
- After clearing the cookie, the token is stored in a blacklist to prevent its reuse.
- Use HTTPS in production to ensure secure token transmission.


## POST /api/v1/captians/register

This endpoint registers a new captain in the system.

### Description

Registers a new captain with the required personal details, credentials, and vehicle information.  
If validation passes and a captain with the same email does not already exist, a new captain is created.  
A JWT token is generated and returned along with the captain's details.

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",         // required, at least 2 characters
    "lastName": "Doe"            // optional but if provided, at least 2 characters
  },
  "email": "john.doe@example.com",  // required, must be in a valid email format
  "password": "password123",        // required, at least 6 characters long
  "vehicle": {
    "color": "red",                 // required, vehicle color
    "plate": "ABC123",              // required, unique, minimum length of 4 characters
    "capacity": 4,                  // required, minimum value of 1
    "vehicleType": "car"            // required; valid values: "car", "bike", "auto"
  }
}
```

### Validation Rules

- **fullName.firstName**:
  - Must not be empty.
  - Minimum length of 2 characters.
- **email**:
  - Required.
  - Must be in a valid email format.
- **password**:
  - Required.
  - Minimum length of 6 characters.
- **vehicle.color**:
  - Required.
- **vehicle.plate**:
  - Required.
  - Must be unique.
  - Minimum length of 4 characters.
- **vehicle.capacity**:
  - Required.
  - Must be a number with a minimum value of 1.
- **vehicle.vehicleType**:
  - Required.
  - Must be one of: "car", "bike", or "auto".

### Response Codes

- **201 Created**  
  Captain registered successfully.  
  Response includes the captain details and a JWT token.
- **400 Bad Request**  
  Validation failed (e.g., missing or invalid fields) or the captain already exists.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Captian registered successfully",
  "captian": {
    "_id": "60c72b2f3f1b2c001c8f9a2e",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-05-29T12:34:56.789Z",
    "updatedAt": "2025-05-29T12:34:56.789Z"
  },
  "token": "jwt.token.here"
}
```

### Notes

- A JWT token is generated and should be used to authorize subsequent requests.
- Ensure that your environment variables such as `TOKEN_SECRET` and `TOKEN_EXPIRY` are correctly set in the `.env` file.
- Use HTTPS in production to securely transmit data.


## POST /api/v1/captians/login

This endpoint authenticates an existing captain.

### Description

Logs in a captain using the provided email and password credentials.  
On successful authentication, a JWT token is generated, set as an HTTP-only cookie, and returned along with the captain's details.

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com", // required, must be in a valid email format
  "password": "password123"          // required, at least 6 characters long
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
  Response includes the captain details and the JWT token set as an HTTP-only cookie.
- **400 Bad Request**  
  Validation failed (e.g., missing or invalid email and/or password).
- **404 Not Found**  
  If no captain is found with the provided email.
- **401 Unauthorized**  
  If the provided password is incorrect.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Captain logged in successfully",
  "captian": {
    "_id": "60c72b2f3f1b2c001c8f9a2e",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "someSocketId",
    "status": "inactive",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-05-29T12:34:56.789Z",
    "updatedAt": "2025-05-29T12:34:56.789Z"
  },
  "token": "jwt.token.here"
}
```

### Notes

- The JWT token is sent as an HTTP-only cookie named `token` for enhanced security.
- Use HTTPS in production to ensure that the token is securely transmitted.


## GET /api/v1/captians/profile

This endpoint retrieves the authenticated captain's profile.

### Description

Fetches the profile details of the currently authenticated captain.  
The request must include a valid JWT token either as an HTTP-only cookie (`token`) or as a Bearer token in the `Authorization` header.

### Request Details

- **Method:** GET  
- **Authentication:** Required  
- **Request Body:** None

### Response Codes

- **200 OK**  
  Profile fetched successfully.  
  Response includes the captain's profile details.
- **401 Unauthorized**  
  If the JWT token is missing, invalid, or the token is blacklisted.
- **404 Not Found**  
  If no captain is found with the given token.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Captain profile fetched successfully",
  "captian": {
    "_id": "60c72b2f3f1b2c001c8f9a2e",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "someSocketId",
    "status": "inactive",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-05-29T12:34:56.789Z",
    "updatedAt": "2025-05-29T12:34:56.789Z"
  }
}
```

### Notes

- The JWT token must be provided for authentication.
- Use HTTPS in production to ensure secure transmission of the token.
- Ensure that your environment variables (e.g., `TOKEN_SECRET`, `TOKEN_EXPIRY`) are properly configured.



## GET /api/v1/captians/logout

This endpoint logs out an authenticated captain.

### Description

Logs out the current captain by clearing the JWT token cookie and blacklisting the token to prevent its further usage.  
The token must be provided either as an HTTP-only cookie named `token` or as a Bearer token in the `Authorization` header.

### Request Details

- **Method:** GET  
- **Authentication:** Required  
- **Request Body:** None

### Response Codes

- **200 OK**  
  Logout successful. Response includes a confirmation message.
- **401 Unauthorized**  
  If the token is missing, invalid, or already blacklisted.
- **500 Internal Server Error**  
  An error occurred on the server.

### Example Response

```json
{
  "message": "Logout successful"
}
```

### Notes

- The endpoint clears the HTTP-only cookie `token` from the client.
- The token is added to a blacklist, preventing its reuse.
- Use HTTPS in production to ensure secure transmission of the token.