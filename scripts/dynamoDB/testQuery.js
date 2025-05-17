import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const config = new DynamoDBClient({
  region: "eu-west-1",
  credentials: {
    accessKeyId: "xxxx",
    secretAccessKey: "xxxx",
  },
  endpoint: "http://localhost:8000",
});

const dynamoDBClient = DynamoDBDocumentClient.from(config);

const putCommandResult = dynamoDBClient.send(
  new PutCommand({
    TableName: "Order_Details",
    Item: {
      user_id: "123",
    },
  })
);

console.log("PutItem succeeded:", putCommandResult);

const scanResult = await dynamoDBClient.send(
  new ScanCommand({ TableName: "Order_Details" })
);

console.log("Scan succeeded:", scanResult.Items);
