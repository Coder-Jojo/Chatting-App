
# Chatting Application

This is a web-based program that allows users to connect with one another in real time. The backend is a node server, the cloud storage service is MongoDb Atlas, and the frontend is React. It also makes advantage of socket.io to send data in real time. The user must first register, after which their information is encrypted and saved. It employs token-based authentication.




## Demo

https://jojo-chat.netlify.app/

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/Coder-Jojo/Chatting-App
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm start
```

To start the server, go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon index.js
```

  
## Tech Stack

**Client:** React, Bootstrap, Material-Ui, Socket.io-Client

**Server:** Node, Express, MongoDb

  
## Features

- Token based Authentication
- See all the users currently online
- Find any user registered on the site using the search bar.
- Chats are saved on the cloud
- User may not be online inorder to receive messages

  
## API Reference

#### Get all the registered users

```http
  GET /api/auth/user/${username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**              |


#### Gets all the conversations of a particular user

```http
  GET /api/conversations/${userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**              |


#### Gets the conversation between two users

```http
  GET /api/conversations/${user1}/${user2}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user1` | `string` | **Required**              |
| `user2` | `string` | **Required**              |


#### Gets a user using its id

```http
  GET /api/user/find/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**              |

