
// scalable architechture in nodejs, best practices

- model - database models in separate file to communicate with the db
- views - client part separate, basically frontend sending request to the server
- controller - all the server related tasks in separate controllers in separated folder

- routes - accepts the incoming requests, and based on routes sends it to controllers with does the task, and sends back response

- middlewares - does the authentication and authorization part, is both global and route specific

--> these all collectively makes the blueprint of standard restfull apis


# hierarchy

- index.js file in the entry point
    - express initialized, server started on port 3000
- defined /book route --> sends all book related requests to the bookRouter in separate books.router files
- bookRouter takes the incoming request, passes it to the bookController that gets the job done and returns the res
- logger middleware used in the routes