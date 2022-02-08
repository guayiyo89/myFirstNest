<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

An API developed using [Nest](https://github.com/nestjs/nest) which obtains a News for every hour from an API of HackerNews.

## Installation

```bash
$ npm install
```

## Running the app

To run the application, you must first build the Docker of the API and then you have to run the docker-compose to run the App and the database.

```bash
# build the docker of the Nest Api
$ docker build -t apinews .

# Compose API + MongoDB
$ docker-compose up -d

```

## Filling the Database

To fill in the database, you first have to be registered in the application. To do this, you have to create a user and then you can log in with it.

When you log in, the application sends you an access token in response. This token must be used to call the endpoint to fill the database with the latest news.

```bash
# endpoint: create user (doesn't need token)
http://localhost:3000/users (POST)

# endpoint: fill Database
http://localhost:3000/news/fill

# test coverage
$ npm run test:cov
```

**NOTE:** It is recommended to create the User, to avoid have problems with testing:
    {username: 'default', password: 'reign2020'}

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Eduardo Mancilla


## License

Nest is [MIT licensed](LICENSE).