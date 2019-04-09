const request = require('request-promise-native');

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

module.exports.fsProxy = async (event) => {
  console.log(JSON.stringify(event));
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
}
