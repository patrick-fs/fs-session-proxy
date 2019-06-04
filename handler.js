const request = require('request-promise-native'); // the 'request' package is a peer dependancy

// TODO: restrict cors header to domains you expect to receive traffic from
const CORS_HEADER = { 'Access-Control-Allow-Origin': '*' };

const fsRequest = request.defaults({
  baseUrl: 'https://www.fullstory.com/api/v1/',
  headers: {
    Authorization: `Basic ${process.env.API_KEY}`,
  },
});

module.exports.ping = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `I'm up!`,
    })
  };
};

const proxy = async (event) => {
  const queryString = Object.keys(event.queryStringParameters).map(key => {
    return `${key}=${event.queryStringParameters[key]}`;
  }).join('&');

  let fsResponse;
  try {
    fsResponse = await fsRequest.get(`sessions?${queryString}`);
  } catch (e) {
    fsResponse = e;
  }

  return {
    statusCode: fsResponse.statusCode,
    body: fsResponse.response.body,
    headers: CORS_HEADER,
  };
};

// TODO: implement your authorization scheme as required
const demoAuthZ = (fn) => async (event) => {

  const authHeader = event.headers.Authorization;
  if (!authHeader || !authHeader.includes('Bearer')) {
    return {
      statusCode: 401,
      body: `{ message: 'Unauthorized' }`,
      headers: CORS_HEADER,
    };
  }

  const authToken = authHeader.split(' ')[1];
  if (authToken !== '12345') {
    return {
      statusCode: 403,
      body: `{ message: 'Forbidden' }`,
      headers: CORS_HEADER,
    };
  }

  return fn(event);
};

module.exports.fsProxy = demoAuthZ(proxy);
