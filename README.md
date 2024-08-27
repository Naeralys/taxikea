# IKEA Technical Assessment - Taxikea Api ![build and test](https://github.com/Naeralys/taxikea/actions/workflows/taxikea-api.yaml/badge.svg)

_TYPESCRIPT / EXPRESS / MONGODB / JEST_

This work is my technical assessment for an IKEA project. It demonstrates how I think about a scalable typescript/express based project and a lot of thought has been put down on making it as easily maintainable and expandable. Even though the solution could easily have been made by a 500 row single typescript file, I wanted to put emphasis on the architecture more than just providing a minimal REST api based on the problem given.

### PROBLEM DOMAIN
The problem specified is a taxi bidding system, like UBER, where a user can request a ride from one location another. A fleet can then bid on this ride, and the rider can then accept one of the bids made.

### SOLUTION
My solution is based on a vertical slice + clean architecture design pattern combo, where an entity "domain" has its own folder with relevant logic. This gives the project an easily extendable and maintainable code base, as one domain or entity could be rebuilt completely without breaking not-so-related code often found in big monoliths. The clear issue with this approach is a big starting project with a lot of files for a very small project, and should probably only be used on problems which might grow more than what's being presented here.

### MY THOUGHTS
This is a structure which I'm extremely fond of, as it can be used on any project with any language (python, c#, java) and on any scale. It's what I've built both previous and current client projects which has turned out to be very scalable with a decent amount of developers working on the same codebase.

It does not contain any "real" unit tests as there is barely any "real" business logic such as converting/manipulating data. I have added an endpoint test validator which really just checks that someone has not completely deleted an endpoint to have a unit test framework up and running. However, a integration test suite has been created to make sure the endpoints works with database queries. If the project was more business logic I'd create more unit tests and less integration tests, and vice versa.

It does not contain a service layer typically found on such projects, as I really only had one function which could be added to a service layer. It turned out to be a really small REST (post/get) project.

### Installation and usage
The project is completely wrapped in a docker environment, which uses the docker-compose.yaml to both initialize and run database and api. As long as you have docker installed then it should really just be a docker-compose run command and you'll have access to the api on localhost:3000

Run this from the root to build and spin up both containers:
```bash
docker-compose up -d --build
```

Endpoints provided:


```
POST /ride

body: {
  "clientId": "client1",
  "pickupLocation": "Malmö",
  "dropoffLocation": "Stockholm",
  "proposedPrice": 120
}
```

```
GET /ride
```

POST /ride/bid
```
{
  "fleetId": "fleet1f",
  "rideId": <REPLACE WITH A RIDE ID FOUND IN GET /ride>,
  "bidAmount": 26
}
```
