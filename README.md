# Authorized access to FullStory /sessions API with AWS Lambda
Route authorized requests for the FullStory `GET /sessions` REST API endpoint through AWS Lambda. Details about `GET /sessions` can be found [here](https://help.fullstory.com/develop-rest/137382-rest-api-retrieving-a-list-of-sessions-for-a-given-user-after-the-fact).

With [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/), you can make calls from the browser and hide your FullStory API token. This example is configured and deployed using the [Serverless Development Framework](https://www.serverless.com).

## Implementation Details

### secrets.yml
The FullStory API key is stored in a file (not commited to this repo) called `secrets.yml`:
```yaml
API_KEY: "your fullstory API key"
```

In `serverless.yml` secret is created as an environment variable available to the Lambda function:
```yaml
...
  environment:
    API_KEY: ${file(secrets.yml):API_KEY}
...
```
(more details about `serverless.yml` can be found [here](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

