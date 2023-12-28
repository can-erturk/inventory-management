# API Reference

Below you can see the endpoints in this backend project.

Only endpoints and their parameters are specified in this reference. You can try the API to see the results returned.

<br>

## Contents of this file

| Route          | Service                                             |
| :------------- | :-------------------------------------------------- |
| `auth`         | [Authentication](#auth-route-endpoints)             |
| `verification` | [Email verification](#verification-route-endpoints) |
| `products`     | [Inventory](#products-route-endpoints)              |

<br>

## Auth route endpoints

### Login

```http
POST /auth/login
```

| Parameter  | Description       | Required |
| :--------- | :---------------- | :------- |
| `user`     | Email or username | `true`   |
| `password` | Password          | `true`   |

### Register

```http
POST /auth/register
```

| Parameter  | Description | Required |
| :--------- | :---------- | :------- |
| `username` | Username    | `true`   |
| `email`    | Email       | `true`   |
| `password` | Password    | `true`   |

### Get credentials

```http
POST /auth/get-credentials
```

| Parameter | Description    | Required |
| :-------- | :------------- | :------- |
| `jwt`     | User's JWT key | `true`   |

<br>

## Verification route endpoints

### Send email

```http
GET /verification/send-email
```

| Parameter | Description   | Required |
| :-------- | :------------ | :------- |
| `email`   | Email address | `true`   |

### Verify email

```http
GET /verification/verify-email
```

| Parameter | Description      | Required |
| :-------- | :--------------- | :------- |
| `key`     | Verification key | `true`   |

### Check verification

```http
GET /verification/is-verified
```

| Parameter | Description   | Required |
| :-------- | :------------ | :------- |
| `email`   | Email address | `true`   |

<br>

## Products route endpoints

### Get product

```http
POST /products/get
```

| Parameter    | Description | Required |
| :----------- | :---------- | :------- |
| `jwt`        | JWT Token   | `true`   |
| `product_id` | Product ID  | `false`  |

### Create product

```http
POST /products/create
```

| Parameter | Description  | Required |
| :-------- | :----------- | :------- |
| `jwt`     | JWT Token    | `true`   |
| `product` | Product data | `true`   |

### Update product

```http
POST /products/update
```

| Parameter         | Description          | Required |
| :---------------- | :------------------- | :------- |
| `jwt`             | JWT Token            | `true`   |
| `product_id`      | Product ID           | `true`   |
| `updated_product` | Updated product data | `true`   |

### Delete product

```http
POST /products/delete
```

| Parameter    | Description | Required |
| :----------- | :---------- | :------- |
| `jwt`        | JWT Token   | `true`   |
| `product_id` | Product ID  | `true`   |
