# Authorized access to FullStory /sessions API with AWS Lambda
Route authorized requests for the FullStory `GET /sessions` REST API endpoint through AWS Lambda. Details about `GET /sessions` can be found [here](https://help.fullstory.com/develop-rest/137382-rest-api-retrieving-a-list-of-sessions-for-a-given-user-after-the-fact).

With [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/), you can make calls from the browser and hide your FullStory API token.
