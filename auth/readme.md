
# Authentication
    - letting the server know the credentials of the user
    - so for every subsequent request, the server know what to send a/c to the data stored of that particular user

# Authorization
    - deciding what resources the user has the access to.
    


# creating a session based authentication system
    - to understand the complete stateful session based auth


- pnpm init
- configure drizzle orm, connect to a db
- add .env, .gitignore
- write start script
- configure drizzle.config.js file

- write schema for db table, push it to db
- create users table for user data


# create sessions table to store session info of currently logged in user   
    - create session for the user logged in, in the db, used to authenticate every subsequent request
    - hence called the session based authentication
    - it's stateful, i.e. the session data is stored in the db
    - so db call is made on every request, thus making it slow and a heavy operation
    - but it's secure and gives the server more control over user activities
    - that's why banking systems use session based authentication

    - return sessionId to the user on login
    - sends it in header on each request
    - if its valid, userId of the user is found from the session's table
    - further user's all details are fetched using the userId, and attached to the request object for every subsequent request for authentication
    - hence all this logic in separate function, can call it auth_middleware
