# API Reference

Below you can see the endpoints in this backend project.

Only endpoints and their parameters are specified in this reference. You can try the API to see the results returned.

<br>

## Contents of this file

| Route          | Service                                       |
| :------------- | :-------------------------------------------- |
| `access`       | [Access sharing](#access-sharing-endpoints)   |
| `auth`         | [Authentication](#authentication-endpoints)   |
| `orders`       | [Scheduled orders](#order-endpoints)          |
| `products`     | [Product inventory](#product-endpoints)       |
| `verification` | [Email verification](#verification-endpoints) |

<br><br>

## Access sharing endpoints

### <u>URL generating</u>

Decodes the given JWT token and generates a URL for the user to share access with.

```http
POST /access/generate-url
```

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| `jwt`     | JWT Token   | `true`   |

<br>

### <u>Receive access</u>

Adds the ID resolved from JWT to the users who have permission to access the inventory of the user with the ID value specified as the parameter.

```http
POST /access/receive
```

| Parameter | Description                                  | Required |
| :-------- | :------------------------------------------- | :------- |
| `jwt`     | JWT Token                                    | `true`   |
| `id`      | The ID of the user who is sharing the access | `true`   |

<br>

### <u>View shared</u>

Lists the permissions that the current user shares with other users.

```http
POST /access/view-shared
```

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| `jwt`     | JWT Token   | `true`   |

<br>

### <u>View received</u>

Lists the permissions that other users have shared with the current user.

```http
POST /access/view-received
```

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| `jwt`     | JWT Token   | `true`   |

<br>

### <u>Revoke shared</u>

Allows the current user to revoke the permissions that other users have shared with them.

```http
POST /access/revoke-shared
```

| Parameter | Description                                         | Required |
| :-------- | :-------------------------------------------------- | :------- |
| `jwt`     | JWT Token                                           | `true`   |
| `id`      | ID of the user whose shared access is being revoked | `true`   |

<br>

### <u>Revoke received</u>

Allows the current user to revoke the access permission shared by another user.

```http
POST /access/revoke-received
```

| Parameter | Description                                           | Required |
| :-------- | :---------------------------------------------------- | :------- |
| `jwt`     | JWT Token                                             | `true`   |
| `id`      | ID of the user whose received access is being revoked | `true`   |

<br><br><br>

## Authentication endpoints

### <u>Login</u>

Returns a JWT token to log in with the given credentials.

```http
POST /auth/login
```

| Parameter  | Description       | Required |
| :--------- | :---------------- | :------- |
| `user`     | Email or username | `true`   |
| `password` | Password          | `true`   |

<br>

### <u>Register</u>

Creates a new user record with the provided credentials. The `/verification` endpoint is used to activate the user created in this endpoint.

```http
POST /auth/register
```

| Parameter  | Description | Required |
| :--------- | :---------- | :------- |
| `username` | Username    | `true`   |
| `email`    | Email       | `true`   |
| `password` | Password    | `true`   |

<br>

### <u>Get credentials</u>

Decrypts the given JWT token to return the user's credentials.

```http
POST /auth/get-credentials
```

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| `jwt`     | JWT token   | `true`   |

<br><br><br>

## Order endpoints

### <u>Get order</u>

Lists all scheduled orders that the user has access to.

```http
POST /orders/get
```

| Parameter  | Description | Required |
| :--------- | :---------- | :------- |
| `jwt`      | JWT Token   | `true`   |
| `order_id` | Order ID    | `false`  |

<br>

### <u>Create order</u>

Creates a new scheduled order.

```http
POST /orders/create
```

| Parameter | Description | Required |
| :-------- | :---------- | :------- |
| `jwt`     | JWT Token   | `true`   |
| `order`   | Order data  | `true`   |

<br>

### <u>Update order</u>

Updates a scheduled order.

```http
POST /orders/update
```

| Parameter       | Description        | Required |
| :-------------- | :----------------- | :------- |
| `jwt`           | JWT Token          | `true`   |
| `order_id`      | Order ID           | `true`   |
| `updated_order` | Updated order data | `true`   |

<br>

### <u>Delete order</u>

Delete a scheduled order.

```http
POST /orders/delete
```

| Parameter  | Description | Required |
| :--------- | :---------- | :------- |
| `jwt`      | JWT Token   | `true`   |
| `order_id` | Order ID    | `true`   |

<br><br><br>

## Product endpoints

### <u>Get product</u>

Lists all products that the user has access to.

```http
POST /products/get
```

| Parameter    | Description | Required |
| :----------- | :---------- | :------- |
| `jwt`        | JWT Token   | `true`   |
| `product_id` | Product ID  | `false`  |

<br>

### <u>Create product</u>

Creates a new product.

```http
POST /products/create
```

| Parameter | Description  | Required |
| :-------- | :----------- | :------- |
| `jwt`     | JWT Token    | `true`   |
| `product` | Product data | `true`   |

<br>

### <u>Update product</u>

Updates a product.

```http
POST /products/update
```

| Parameter         | Description          | Required |
| :---------------- | :------------------- | :------- |
| `jwt`             | JWT Token            | `true`   |
| `product_id`      | Product ID           | `true`   |
| `updated_product` | Updated product data | `true`   |

<br>

### <u>Delete product</u>

Delete a product.

```http
POST /products/delete
```

| Parameter    | Description | Required |
| :----------- | :---------- | :------- |
| `jwt`        | JWT Token   | `true`   |
| `product_id` | Product ID  | `true`   |

<br><br><br>

## Verification endpoints

### <u>Send email</u>

If there is a user with the given email address, sends a verification email to that email address. The sent email contains a verification key and must be used in the `/verification/verify-email` endpoint.

```http
GET /verification/send-email
```

| Parameter | Description   | Required |
| :-------- | :------------ | :------- |
| `email`   | Email address | `true`   |

<br>

### <u>Verify email</u>

Checks if the given key matches the key generated at the `/verification/send-email` endpoint, and if so, it activates the user's status.

```http
GET /verification/verify-email
```

| Parameter | Description      | Required |
| :-------- | :--------------- | :------- |
| `key`     | Verification key | `true`   |

<br>

### <u>Check verification</u>

Checks whether the user with the given email address is verified.

```http
GET /verification/is-verified
```

| Parameter | Description   | Required |
| :-------- | :------------ | :------- |
| `email`   | Email address | `true`   |

<br>
