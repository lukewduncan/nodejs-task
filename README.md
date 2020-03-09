# Corva - Book API
Please see https://intense-beyond-20836.herokuapp.com/ for instructions on how to use the API. The URL is also what you will use to make requests.

When I first started out on this project, I decided to use Express. It has been a few years since I have used NodeJS and Express in a production environment, but my thoughts were that I have enough working knowledge to know when I was heading in the right direction.

Below, you'll find my explanations about the decisions that I made to build the application.

#### Object modelling and MongoDB
I thought it would be best to use Mongoose in order to model the data. This is because the data between User and Books was relational. It also allowed me to build the application quicker, because I had working knowledge. 

If the goal of the project was to use MongoDB native web driver directly, I apologize. I can see the need to utilize MongoDB native web driver for large datasets, but again - in situations of a simple CRUD app, object modelling made sense to me.

I purposely structured the application with the use of services. If things had to be changed to use the MongoDB native web driver, it would be easy to refactor our CRUD services.

As far as the actual database, I implemented MongoDB Atlas to get my application up and running quickly. I did not have MongoDB installed locally and attaching a URL string to Mongoose was much easier for me.

#### Authentication
From the project instructions, I knew that a user had to have the ability to signup, and then be authenticated when making requests. Having prior Express experience, I used PassportJS and JSON Web Tokens. 

The User endpoints simply signup `POST /api/signup` and retrieve the JWT Token `POST /api/token` to make requests in the future. Both endpoints require `username` and `password`. In order to secure our app further, I utilize Bcrypt to hash the password upon initial save of the user.

All routes under `/api/books` are utilizing `passport.authenticate()` in the route middleware. This is to validate the JWT token so we can figure out which user is making the request.

#### Application Structure
I am more comfortable in a Ruby on Rails environment. When configuring the project, I wanted to setup Express to mimic Rails and typical MVC structure. To do that, I setup:

  * Routes
    * All of our routes are setup by controller action. E.g. `GET /api/books/all` utilizes the `BooksController.getAllBooks` controller function.
  * Controllers
    * This handles the actual request and response object. In the controller functions themselves, a service function is run, then we return the response from those services.
  * Services
    * Services encapsulate all of the information needed to execute a method or process. This is where the logic goes to complete the Controller action so that we can keep our controllers "skinny". By encapsulating all of our methods, although it wasn't done in this app, it would be easy to setup some sort of background processor for these services so we can choose our execution lifecycle (which functions are more important).

On top of this structure, testing was also implemented using Mocha, Chai and Chai-HTTP for requests. The test suite covers all the basic CRUD actions.

### Extras Implemented
Here are some of the extras I implemented according to the project spec
* Users created as administrators. I simply attached an `admin` attribute on the User model. Most of the admin logic lays behind the Book model, so I implemented a `confirmOwnership` method on Book to see who was making the requests on certain records.
* Rate limiting was setup using the `express-rate-limit` middleware. It's setup to apply only to requests that begin with `api`
* Deployed solution to Heroku
* Endpoints adhere to a JSON specification
* Implemented Serverless to AWS Lambda. Started running into errors - currently stuck on https://stackoverflow.com/questions/29994411/invalid-elf-header-when-using-the-nodejs-ref-module-on-aws-lambda. Need to figure out why bcrypt isn't installing on the Lambda application.


### Difficulties
Below are some problems I ran into while building the application.
* Choosing a pattern to use. Whether that be Promise based, or Async/Await.
* Switching from using Ruby to Javascript on the backend took a few days to get used too.
* The asynchronous nature of NodeJS. Using the Async/Await pattern made things a little easier to read/write.
* The simple task of setting up Express to utilize layouts so I could write the documentation on `/`

------------------

# Task Delivery

* Please don't fork, branch or create a pull request with this repository. 
* Clone it and do your work there.
* When the task is ready, **Email** your solution back to us (Only first submit count unless otherwise directed).

# Corva NodeJS Test Task

Thank you for applying to Corva! We'd like to see how you'd create APIs in the context of Corva's technologies

## API Creation

Using your framework of choice, create a performant NodeJS REST API. This API will users to add their favorite books to a database.

As a consumer of this API, I should be able to create new books, update books that I've created, and delete any book that I've created. I should be able to see all books that I've created but also see books created by anyone.

## Assumptions

- Users can create their own accounts
- Users can be authenticated
- The use of the MongoDB native web driver

## Extra Credit

- Users created as administrators can update and delete any book
- A websocket that publishes any new posts (logging the event and context is probably fine here, but be as creative as you wish)
- Building your app to deploy to AWS Lambda
- Data in the response adheres to a JSON API standard
- Rate limiting users with an API key
- The use of TypeScript
- The use of GraphQL
- Deploying your solution

## Final Note

The details of this challenge are left purposely vague so that we can see how you might approach these problems with minimal guidance. Whatever solutions you choose to implement, please write product ready code that is documented heavily. Please include a README that can we can use to run your project locally. The more we know about why you made your decisions, the better.
