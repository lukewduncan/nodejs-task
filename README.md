# Task Delivery

```diff
- Please don’t fork/branch or create pull-request from the repository.
- Clone it and email your solution back to us when you’re done.
```

# Corva NodeJS Test Task

Thank you for applying to Corva! We'd like to see how you'd create APIs in the context of Corva's technologies

## Api Creation

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

The details of this challenge are left purposely vague so that we can see how you might approach these problems with minimal guidance. Whatever solutions you choose to implement, please write product ready code that is documented heavily. Please include a README that can we can use to run your project locally.
