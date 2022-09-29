# Pizza API

Restful Pizza service. This service can provide the following ,

- Create Order with items and delivery address
- Update Order 
- Pay order (dummy payment process)
- Check status of an order
- Fetch Pizza Menu
- Cronjob to change state of an order based on it's own state (Not required in real implementation and should be replaced with proper state management )

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e order tests 
$ npm run test:order.e2e

```

## Swagger Documentation

Visit http://localhost/pizza-api/swagger for API documentation. 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Akibur Rahman](https://kamilmysliwiec.com)


## License

  Nest is [MIT licensed](LICENSE).
