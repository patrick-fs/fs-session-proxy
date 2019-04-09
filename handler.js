'use strict';

const FULLSTORY_API_BASE = 'https://www.fullstory.com/api/';
const CORS_HEADER = { 'Access-Control-Allow-Origin': '*' };

module.exports.ping = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `I'm up!`,
    }),
    headers: CORS_HEADER,
  };
};

module.exports.fsProxy = async (event) => {
  console.log(JSON.stringify(event));
  const pathParams = event.pathParameters.path;
  const queryString = Object.keys(event.queryStringParameters).map(key => {
    return `${key}=${event.queryStringParameters[key]}`;
  }).join('&');
  const fsUrl = `${FULLSTORY_API_BASE}${pathParams}?${queryString}`;
  console.log(fsUrl);
  // TODO: mirror back the response to the sessions API
  // TODO: on second thought - just limit this proxy to the /sessions endpoint
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'all good',
      pathParams,
      headers: CORS_HEADER,
    }),
  };
}
