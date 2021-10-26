# Founder And Lightening Assignment

## Node.js and npm Installation

Please make sure Node.js (v14.x.x or above) and npm are installed on your machine.

## Database Requirements

- Database: Mongodb
  I used Mongodb Atlas in this project for simplicity so you also use mongodb atlas or Please make sure a local mongodb installation and also mongo user account to connect to mongodb if you enabled authentication otherwise there is no special need to create mongodb user account.

## Source Code Installation

Download the source code using

```bash
git clone https://github.com/bhargava-ramudu/fnl-assignment.git
```

or download the source code zip file and extract it to a folder

## Usage Requirements

Go to the root folder and create a file called .env

Put the below variables in .env file

```bash
PORT=3000
NODE_ENV=development
DEVELOPMENT_DATABASE_URL=<development database url>
TEST_DATABASE_URL=<test database url>
PRODUCTION_DATABASE_URL=<production database url>
OWM_API_KEY=<openweathermaps api key>
```

## Note:

- I have included a .env.example file for your reference

## Usage

To install node modules run the below command

```bash
npm install .
```

after the completion of node modules installation, run the server using the below command

```bash
npm run start
```

# REST API

## API ROUTES

- Get cities with weather data

```
    GET /api/cities?page=1&limit=10
```

- Get a weather data of single city

```
    GET /api/cities?city=london
```

- If there is no city record in the database, user will get 404 response(city not found)

- Insert city record with weather data

```
    POST /api/cities

    Body Json Example:
    {
        "city": "london"
    }

```

## Note:

- In above POST request, if city does not exist in database it will create one else it will just update the record which is present in cities table with latest weather data.

- In cities GET request, when we request a single city data I am checking a condition whether the latest data is available or not. If latest available, I am updating the database and returning the response or will just return data available in our database.

- Intentionally not checking for latest data in POST request, just always updating the data if city exists or just create a new city and return the data.

- I created helper functions but we can achieve various functionalities using middlewares also.

- For simplicity, I created city model with many Mongoose Mixed fields for storing within the weatherDataList and city field but we can create exact objects that we are getting from openweather api

- I added only two integration tests due to the very tight schedule.

## But If I have got more time

- I would have created User authentication functionality and also verify before user adding cities

- I would have added better error formatters to provide same format of errors to frontend in both the case where we are validating user input data && mongoose errors.

- I would have created better documentation for the entire application

- I would have created a small front ui to show various data

- I wolud have created more unit, integration and some end to end tests for various test cases to achieve 100% coverage.

- I would have added logging middlware to store the logs in centralized storage

- For fetching data from openweatherapi maps, I just created a single helper function but if I have got more time, I would have created entire service module for calling external apis so it would be just plug n play whenever we want replace third party external api calling libraries like axios, node-fetch etc.

- I would have added database query caching so that will decrease load on our database.

# Note:

- As this is a very small api requirement, I created few helper functions to achieve the functionality while following DRY principles

- But for very complex applications I will plan according to the application requirement to maintain more modular and maintainable code.

## License

[MIT](https://choosealicense.com/licenses/mit/)
