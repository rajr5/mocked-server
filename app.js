const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const logging = process.env.logging || true;

function log(...data) {
  if(logging) {
    console.log(...data);
  }
}

/**
 * Respond to any request with a stock response
 */
app.post('/', function(req, res, next) {
  log('POST request to /', req.query);
  log('QUERY', JSON.stringify(req.query));
  const error = req.query.error;
  if(error) {
    res.status(500);
    const responseObj = {
      message: req.query.message || `Sending generic error because "error" query param was specified`,
      error: error,
      originalPayload: req.body,
      queryParams: req.query
    };
    log('RESPONSE', JSON.stringify(responseObj));
    res.json(responseObj);
  } else {
    res.status(200);
    const responseObj = {
      response: "OK",
      originalPayload: req.body,
      queryParams: req.query
    };
    log('RESPONSE', JSON.stringify(responseObj));
    res.json(responseObj);
  }
});

app.get('/', function(req, res, next) {
  log('GET request to /');
  log('QUERY', JSON.stringify(req.query));
  const responseObj = {
    availableEndpoints: [
      {
        method: 'POST',
        path: '/',
        payload: "any - will respond with same response no matter payload",
        queryParams: [
          {
            name: "error",
            type: "string | boolean",
            description: "if set to any value, will return status code 500 and an error message"
          },
          {
            name: "message",
            type: "string",
            description: "If error is provided, this will optionally be used as the response error message. Ignored if error is undefined and stock message is returned if this value is null nad error is specified"
          }
        ],
        response: {
          response: "OK",
          originalPayload: "Body of POST request",
          queryParams: "Query parameters as JSON object"
        }
      }
    ]
  };
  log('RESPONSE', JSON.stringify(responseObj));
  res.json(responseObj);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  log('ERROR', err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
