
# Description

Site built using Java Spring for backend and React for frontend. It uses API calls to perform database operations.

Project done for Web Applications Building class at ACIEE UGAL


## API Reference Sheet

#### Get item

```http
  GET /employee/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Edit item

```http
  PUT /employee/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to edit  |

#### Add item

```http
  POST /employee
```

Adds an employee. The ID is auto-generated.

#### Delete item

```http
  DELETE /employee/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete|

#### Get all items

```http
  GET /employees
```
Returns all the employees.

