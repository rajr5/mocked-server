# Mocked Server
This simple express application allows a GET and POST request to "/" that will alwasy return a mocked resposne.

## Use Cases
This is useful when you want to be able to call to a server and get a response very early in a development cycle without worrying about dependencies

## Available Requests with Payload
### GET /
**Response - http status 200**
```json
{
  "availableEndpoints": [
    {
      "method": "POST",
      "path": "/",
      "payload": "any - will respond with same response no matter payload",
      "queryParams": [
        {
          "name": "error",
          "type": "string | boolean",
          "description": "if set to any value, will return status code 500 and an error message"
        },
        {
          "name": "message",
          "type": "string",
          "description": "If error is provided, this will optionally be used as the response error message. Ignored if error is undefined and stock message is returned if this value is null nad error is specified"
        }
      ],
      "response": {
        "response": "OK",
        "originalPayload": "Body of POST request",
        "queryParams": "Query parameters as JSON object"
      }
    }
  ]
}
```
### POST /
**POST** `/?myQueryParam=baz`

**Body** `{ "foo": "bar" }`

**Response - http status 200**
```json
{
  "response": "OK",
  "originalPayload": {
    "foo": "bar"
  },
  "queryParams": {
    "myQueryParam": "baz"
  }
}
```

**POST** `/?error=baz&message=some+custom+error+msg`

**Body** `{ "foo": "bar" }`

**Response - http status 500**
```json
{
  "message": "some custom error msg",
  "error": "baz",
  "originalPayload": {
    "foo": "bar"
  },
  "queryParams": {
    "error": "baz",
    "message": "some custom error msg"
  }
}
```

**POST** `/?error=baz`

**Body** `{ "foo": "bar" }`

**Response - http status 500**
```json
{
  "message": "Sending generic error because \"error\" query param was specified",
  "error": "baz",
  "originalPayload": {
    "foo": "bar"
  },
  "queryParams": {
    "error": "baz"
  }
}
```

## Running Locally
* Install Node
* Run `npm install`
* Run `npm start` or `node bin/www`
* Make `GET` or `POST` requiest to `/`

## Deploying on Heroku
Heroku is really easy to use for deploying node apps and I highly recommend it - simple and free for minimal use. Your app will "sleep" if not used for a period of time. This means the first request can be a little slow as the server wake up.
* Fork this repo, or clone and upload somewhere
* Create/login to Heroku
* Create a new Heroku app
* Connect github account
* Choose repository (cloned repo)
* Click deploy from master branch