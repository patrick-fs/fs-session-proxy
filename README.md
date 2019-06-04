# Authorized access to FullStory /sessions API with AWS Lambda
Route authorized requests for the FullStory `GET /sessions` REST API endpoint through AWS Lambda. Details about `GET /sessions` can be found [here](https://help.fullstory.com/develop-rest/137382-rest-api-retrieving-a-list-of-sessions-for-a-given-user-after-the-fact).

With [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/), you can make calls from the browser and hide your FullStory API token. This example is configured and deployed using the [Serverless Development Framework](https://www.serverless.com).

## Implementation Details

### secrets.yml

The FullStory API key is stored in a file (not commited to this repo) called `secrets.yml`:
```yaml
API_KEY: "your fullstory API key"
```

In `serverless.yml` this secret is created as an environment variable available to the Lambda function:
```yaml
...
  environment:
    API_KEY: ${file(secrets.yml):API_KEY}
...
```
(more details about `serverless.yml` can be found [here](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

You can provide even more secure storage of your API key by using AWS Systems Manager parameter store: https://aws.amazon.com/blogs/compute/sharing-secrets-with-aws-lambda-using-aws-systems-manager-parameter-store/.

### handler.sj

`handler.js` contains all of the example logic that authorizes calls to your service before making a request to the FullStory REST API. There are a couple of important `TODOs` in the sample code that you should address:

```JavaScript
// TODO: restrict cors header to domains you expect to receive traffic from
const CORS_HEADER = { 'Access-Control-Allow-Origin': '*' };
...
```

and

```JavaScript
// TODO: implement your authorization scheme as required
const demoAuthZ = (fn) => async (event) => {
...
```
