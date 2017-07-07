# Cutesy Local

This repo contains the Cutesy Local front-end client and back-end API. Built with Express and MongoDB the API allows users to perform CRUD operations on dog-friendly venues and patrons within San Francisco to power the front-end React app.

## How to start this app

* `node setup.js`, insert API keys in `.env` file
* `npm install`
* `cd client`
* `npm install`
* `cd ..`
* `npm start`

### Back-end

> **Pro tip:** Install and use [Postman](https://www.getpostman.com/) to test the API routes for this section

Using the existing code provided in `server/`, follow the steps below to build out a Pokémon API:

|      URL             | HTTP Verb | Request Body |                         Result                                           |
|:--------------------:|:---------:|:------------:|:------------------------------------------------------------------------:|
| /api/venues          |    GET    |    empty     |                                                Return JSON of all venues |
| /api/venues          |    POST   |     JSON     |                        Create new venue and return JSON of created venue |
| /api/venues          |   DELETE  |    empty     |                   Delete all venues in and return JSON of deleted venues |
| /api/venues/:number  |    GET    |    empty     |                              Return JSON of venue with matching `number` |
| /api/venues/:number  |    PUT    |     JSON     |     Update venue with matching `number` and return JSON of updated venue |
| /api/venues/:number  |   DELETE  |    empty     |     Delete venue with matching `number` and return JSON of deleted venue |
| /api/keys            |    GET    |     JSON     |                                                   Return JSON of API key |
| /api/users           |    GET    |    empty     |                                                 Return JSON of all users |
| /api/users           |    POST   |     JSON     |                          Create new user and return JSON of created user |
| /api/users           |   DELETE  |    empty     |                     Delete all users in and return JSON of deleted users |
| /api/users/:number   |    GET    |    empty     |                               Return JSON of user with matching `number` |
| /api/users/:number   |    PUT    |     JSON     |       Update user with matching `number` and return JSON of updated user |
| /api/users/:number   |   DELETE  |    empty     |       Delete user with matching `number` and return JSON of deleted user |

## App Overview

This app configures a Webpack development server to run on `localhost:3000`. This development server will bundle all static assets located under `client/src/`. All requests to `localhost:3000` will serve `client/index.html` which will include Webpack's `bundle.js`.

To prevent any issues with CORS, the user and her browser will communicate exclusively with the Webpack development server.

Inside `Client.js`, we use Fetch to make a request to the API:

```js
// Inside Client.js
return fetch(`/api/data`, {
  // ...
})
```

This request is made to `localhost:3000`, the Webpack dev server. Webpack will infer that this request is actually intended for our API server. We specify in `package.json` that we would like Webpack to proxy API requests to `localhost:3001`:

```js
// Inside client/package.json
"proxy": "http://localhost:3001/",
```

This handy features is provided for us by `create-react-app`.

Therefore, the user's browser makes a request to Webpack at `localhost:3000` which then proxies the request to our API server at `localhost:3001`:

![](./flow-diagram.png)

This setup provides two advantages:

1. If the user's browser tried to request `localhost:3001` directly, we'd run into issues with CORS.
2. The API URL in development matches that in production. You don't have to do something like this:

```js
// Example API base URL determination in Client.js
const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/'
```

This setup uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) for process management. Executing `npm start` instructs `concurrently` to boot both the Webpack dev server and the API server.
