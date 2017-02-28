# Cutesy Local

This repo contains the Cutesy Local front-end client and back-end API. Built with Express and MongoDB the API allows users to perform CRUD operations on dog-friendly venues and patrons within San Francisco to power the front-end React app.

## How to start this app

* `node setup.js`, insert API keys in `.env` file
* `npm install`
* `cd client`
* `npm install`
* `cd ..`
* `npm start`


## Improvements

Pull requests are welcome and greatly appreciated! The priority for this project is to build out app functionality in the following order, checking off the remaining boxes [ ] as we go:

- Front-end
- Middleware
- Back-end
- Testing

## Front End

Known Bugs
  [X] breaks when review submitted without user
  [X] Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the t component.
  [X] Warning: Failed prop type: Invalid prop `dimmer` supplied to `Modal`.
  [ ] bottombar buttons don't stick to top of container in Safari browser
  [ ] mapbox-gl.js:170 WebGL: INVALID_OPERATION: texSubImage2D: ArrayBufferView not big enough for request
  [ ] truncated viewport height
  [ ] marker A dissapears if too close to marker B

Change Log
[X] Cluster markers - `cluster` branch
  [X] Refactor marker divs into MapboxGL layers
  [X] Add Mapbox Sources and Layers
  [X] Coordinate venue cluster colors
[X] Toggle markers
[X] Include Popups - `cluster` branch
  [X] Add onClick behavior to markers
  [X] Render popup component
  [X] Refactor markers as MapboxGL layers
  [X] Dynamically render smiley assets for rating
  [X] Mobile first styling
[X] Serve all data from back end - `db` branch
  [X] Debug filter on layer `cluster-${venue}`
  [X] refactor data fetched from db
  [X] separate components
  [X] Fetch and handle data on client side
  [X] Hide API keys
[ ] Final v0.10 Features
  [X] include links to venue websites
  [X] Authentication
  [X] Implement Popup (Sidebar) with semantic ui react
    [X] stretch review across
    [X] show reviews on `see reviews` click
    [X] scroll between reviews in Popup component
  [X] Leave review
    [X] expand venues schema
    [X] persist review
    [X] reset review state on `submit` onClick
    [X] retrieve updated db data
    [X] close modal on `submit`
    [X] assign venue accomodations to `accomodations` object
      [X] change model
      [X] follow up back-end logic in controller
      [X] follow up front-end logic in Info component children
        [X] Popup
        [X] ReviewModal
    [X] render accomodations ribbons dynamically
      [ ] implement accommodations subSchema in venues model
      [X] don't forget to reset App.state.review after submittal
      [X] check all uses of Object.assign to make sure it's right
      [X] Bug fixes
        [X] calculate cummlative average among all reviews
        [X] set venue accomodations to fixed value in ReviewModal component
    [X] implemnent and render timestamp dynamically for each review
    [X] include URLs in initial venues data
    [ ] scrape for dog events
  [X] Login modal on site load
  [X] clean up Nav with semantic ui
  [X] center and compact bottombar popup elements
  [X] Restyle button bar as SUI topbar
    [X] change button style on click
    [X] capture toggledVenues
    [ ] figure out why tf markers still toggle on button click
      [ ] something to do with button's classname
  [X] Loading page
  [X] Loading reviews / info
  [ ] Deployment
    [ ] hide sensative info on state
    [ ] google analytics middleware
    [ ] Final code review
[ ] Replace `How to start this app` with script and update README.md

[X] Conflicts overcome
  [X] Sharp UX of MapBoxGL vs. clustering and dynamic geojsonifying with Leaflet


v0.20
[ ] Data
  [ ] incorporate http://petfriendlyrestaurants.com/state/CA/San_Francisco#page:[1-5]
[ ] Performance
  [ ] Implement server side React for much faster UX
  [ ] replace mapboxgl dependency with react-redux-mapbox-gl implementation for speed and stability
[ ] Features
  [ ] * call to action link to App Store
  [ ] Allow users to review new venues
  [ ] Collect statements of dog-friendliness from businesses for Info view
    [ ] crawl urls for contact info
  [ ] Cool Mapbox features
    [ ] Visible venues sidebar in medium to x-large devices (https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/)
    [ ] featured venue slideshow (https://www.mapbox.com/mapbox-gl-js/example/...)
    [ ] Implement filters using mapbox-gl-compare OR mapbox-gl-sync-move
[ ] Styling
  [ ] Swap images, fonts, etc. for Cutesy logo and other assets
  [ ] include MozSwipeGesture listener into the library



## Middleware

[ ] Implement google analytics


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


[ ] Replace MongoDB with PostgreSQL
- [ ] Save PostgreSQL to `package.json`
- [ ] Connect PostgreSQL ODM to local db in `db/index.js`
- [ ] Create two models in `resources/api/api.js` and register it with db as the `Venues` & `Users` collections
- [ ] Populate db with the venues and users found in `data/`
- [X] Create a controller in `resources/api/apiController.js` that interacts with your Venues and Users models
- [X] Create a router in `resources/api/apiRouter.js` that utilizes each of your controller's methods. Be sure to handle errors appropriately.
- [X] Import `apiRouter` into `server.js` and assign it to the correct route
- [ ] Write at least two tests in `test/api-spec.js` that will help assure future developers that the API is working as intended

### More Features

> **Escape hatch:** Mock out any server bugs with [json-server](https://github.com/typicode/json-server).

Your front end should be served from Express and should allow the user to:
- [ ] Display all venues (with their images)
- [ ] Add new users
- [ ] Add new venues
- [ ] Filter venues based on their type

### More Middleware

> **Suggestion:** Complete all of the steps in [back-end](#back-end) before implementing middleware.

Inside of `server/middleware/rateLimiter.js`, create a custom middleware function in which you implement rate limiting for your API with the following guidelines.

- [ ] Require each request to `/api/api` to include a `user` property in the header
- [ ] Only allow a single user to make 100 requests per hour
- [ ] Mount your middleware in an appropriate location in `server/server.js`
- [ ] Update your front-end to send `user` property with each request

Inside of `server/middleware/rateLimiter.js`, create a custom middleware function in which you implement rate limiting for your API with the following guidelines.

- [ ] Require each request to `/api/api` to include a `user` property in the header
- [ ] Only allow a single user to make 100 requests per hour
- [ ] Mount your middleware in an appropriate location in `server/server.js`
- [ ] Update your front-end to send `user` property with each request



## App Overview

`create-react-app` configures a Webpack development server to run on `localhost:3000`. This development server will bundle all static assets located under `client/src/`. All requests to `localhost:3000` will serve `client/index.html` which will include Webpack's `bundle.js`.

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

## Deploying

### Background

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

Inside `server.js`, we tell Node/Express we'd like it to serve static assets in production:

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```

You just need to have Webpack produce a static bundle of the React app (below).

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Build the React app**

Running `npm run build` creates the static bundle which we can then use any HTTP server to serve:

```
cd client/
npm run build
```

**2. Commit the `client/build` folder to source control**

From the root of the project:

```
git add client/build
git commit -m 'Adding `build` to source control'
```

**3. Create the Heroku app**

```
heroku apps:create food-lookup-demo
```

**4. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.
