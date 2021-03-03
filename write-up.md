# Write-up
In this write-up, I share my thought process and approach for this project.

## Ember Data
I created three models, with various relationships between them:
- comment
- launch
- rocket

### Serializers and Adapters
For each model, I created a custom serializer and adapter. This is necessary because the different models have different APIs, and different APIs have different formats on their response payloads.

### Comments
For the comments, I set up a mirage mock API endpoint that serves dummy data to the client, as recommended in the prompt for this project.

### Relationship between launches and rockets
This app doesn't utilize the relationship between launches and rockets at all, so there's not much incentive to manage the relationship. However, it would be interesting to brainstorm how we might manage it if we needed to.

I believe that the current spacex API is sub-optimal for managing the relationship via Ember data, for the following reasons:
- The current `launch` endpoint does not include any `rocket` data. For each `launch`, the API only provides a `rocket` id. This means that we cannot use Ember Data's built-in `include` feature, which would allow us to sideload `rockets` onto the `launch` request. In other words, we must make TWO separate API requests for `rocket` and `launch`, instead of just ONE API request that includes both.
- The current `rocket` endpoint does not include ANY reference to `launches`. So, in order to find the `launches` that a given `rocket` is related to, we must make an API request to get ALL `launches` at once, then filter that list.

The above concerns aren't too impactful now, since the spacex API currently yields <150 total records between launches and rockets. However, this could become more problematic if we increase the number of records.

**EDIT:** I just realized that the spacex API does offer some ["query" endpoints](https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/queries.md), where we can pass in some MongoDB query language to refine/filter the repsonse we recieve from the API. This could potentially help mitigate some of the concerns above.

## The "Details" Page
Here I'm talking about the page where you can view an individual launch or rocket. I've created two separate routes - one for the rocket details and one for the launch details. Both routes have identical templates and components - the only difference is the `model()` hook on the route files.

One interesting feature of these pages is the way in which comments are loaded. Since comments are not included in the original spacex API, we must load the comments in a separate API request. As mentioned earlier, I set up a mirage mock API endpoint for comments.

In particular, the `model()` hooks run a function like:
```js
this.store.query('comment', {
    filter: { rocketId: params.rocket_id },
});
```

To see how I structured the mock API endpoint to handle this, you can view the file `mirage/config.js`.

## The Dashboard Page
The dashboard page displays either all rockets, or all launches, in a grid or list view format.

The app currently has exactly one `dashboard` route, with the following features:
- In the route's `model()` hook, we make API requests for ALL launches and rockets.
- We utilize the `controller` to provide action methods to the buttons on the page, and also store state (i.e. whether to display rockets or launches, grid or list view).

Below we discuss some potential optimizations for the two bullet points above.

### API Requests
After completing the first iteration of this project, I realized that the current strategy of "eager loading" both the launch and rocket data upfront can be sub-optimal. For example, if a user decides that she only wants to look at rockets on the dashboard, then she has unnecessarily paid the cost of loading all of the launches when visiting the dashboard.

This issue is not too impactful now, with <150 total records between launches and rockets; however, it may become more problematic later, if we increase the number of records.

The **first potential solution** I thought of was to move the API call logic outside of the `model()` hook on the route, and instead load data whenever the user clicks on the "launches" or "rockets" button. However, I later saw that the [Ember guide itself](https://guides.emberjs.com/release/in-depth-topics/making-api-requests/#toc_where-to-make-api-requests) strongly recommends against doing this for various reasons;  models should almost always be loaded in the `model()` hook. Therefore, I think we should avoid this approach.

The **second potential solution** is to create two separate routes for launches and rockets. This approach lets us keep all of the API call logic in the `model()` hook, and, it solves the original problem of loading unnecessary data that we won't display. Also, code readability is improved - we make each route load exactly one model type, instead of two.

Assuming we take the second approach, we must next consider how to manage state across the two routes.

### State Management
When managing state, we would ideally track whether the user has selected grid view or list view. For example, suppose a user went to the launches route, then chose the list view, then went to the rockets route. Then, the rockets page should still show the list view instead of grid view.

Below are two ways of achieving this:
- Nest the two routes under a shared parent route, and store the state in the parent controller
- Create a service, and manage state there.

I am more inclined towards the second option, since it seems simpler.

## Helpers
When I first created my components, I created computed properties like `capitalizedModelName`. However, I later decided to remove the computed properties, and use custom helpers instead (i.e. change `{{this.capitalizedModelName}}` to `{{capitalize @modelName}}` in the `.hbs` templates). This helper approach allows us to reduce code duplication, and encourage code reuse - instead of writing multiple computed properties such as `capitalizedModelName`, `capitalizedRocketName`, `capitalizedLaunchName`, we can just write one `capitalize` helper function, and use that in the templates.

This approach yields the following advantages:
- Improves simplicity and readability of code
- Reduces code surface area, which should (theoretically) reduce the potential for bugs and/or security holes
- Fewer computed properties means less time/effort spent maintiaining tests for each computed property

## Testing
This was my first time writing tests for ember, and it was a very enjoyable experience. The ember test helpers are definitely very helpful.

I configured mirage such that, in a test environment, it would mock out calls to the spacex API, but in a production or dev environment, it would allow calls to the spacex API.

Also, a side note for testing - in the provided mirage/faker article, and in AuditBoard's test code, I noticed that the tests relied on randomly generated data (i.e. utilizes the `faker` library). However, I [read on Stack Overflow](https://stackoverflow.com/questions/11553078/unit-testing-with-random-data) that generally, unit tests should be deterministic in nature, i.e. they should not rely on randomness. I'm not sure if this sentiment should apply for integration and/or acceptance tests as well as unit tests.

In my mirage factories, I used `faker` anyways, but still, this is interesting to point out.

## Styling
I could have made things easier for myself, had I used a prebuilt style library (e.g. [Ember Bootstrap](https://www.ember-bootstrap.com/)). However, I decided not to "cheat", and stuck with raw CSS for the project. It was definitely good practice.

My main focus here was to employ responsive web design techniques (i.e. flexbox, grid, image auto-sizing, etc.). I would like to say it was at least semi-successful.

The one glaring failure was the inability to successfully auto-scale the `iframe` for the youtube videos on the launch details page. Maybe I could figure it out if I had more time to play around with it.

I also decided to loosely follow the [BEM Methodology](https://en.bem.info/methodology/quick-start/) when writing out my CSS. It was helpful to approach CSS with this modular, compartmentalized way of thinking - similar to Ember's natural design philosophy with components.

## Deployment
I originally tried to dockerize the app and upload to heroku, using `ember serve` as the container's start command; however, this approach consistently put me over the memory limit on heroku.

After researching more, I learned that `ember serve` is not the way to go for production. Instead, we must "build" the app (i.e. minify, transpile, etc.), then we can push the built code to server host.

I decided to go the simple route, and host the app on GitHub pages. I found a [plugin for ember-cli-deploy](https://www.emberobserver.com/addons/ember-cli-deploy-git) to facilitate the deployment process.   

In the future, it might be interesting to learn more about the intricacies of the deployment process, but for now, this can suffice.

## To-dos:
- Implement the dashboard route optimizations discussed above
- On the details page, add a button/link to go back to the dashboard
- Handle launches and rockets that have no images (maybe use a "stock" default image?)
- Improve styling:
    - Dynamically resize the iframe for youtube videos
    - Add more interactivity, i.e. more animations and effects when hovering the mouse, clicking things, transitioning between routes, etc.
    - Add more color, potentially use a color scheme, etc.
    - Add different fonts
    - Add icons for list/grid view
    - Add a favicon