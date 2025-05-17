import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient
} from "@aws-sdk/lib-dynamodb";
import { ordersData } from "./seedData/ordersData.js";

const MAX_BATCH_WRITE_ITEMS = 25;

//Wrap it in the Document client
const setClient = new DynamoDBClient({ region: "eu-west-1" });
const dynamoClient = DynamoDBDocumentClient.from(setClient);

async function batchWrite(items, tableName) {
  const chunks = [];
  for (let i = 0; i < items.length; i += MAX_BATCH_WRITE_ITEMS) {
    chunks.push(items.slice(i, i + MAX_BATCH_WRITE_ITEMS));
  }

  //For each chunk, send a BatchWriteCommand
  const promises = chunks.map(chunk =>
    dynamoClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [tableName]: chunk,
        },
      })
    )
  );

  return Promise.all(promises);
}

//Run the seed
batchWrite(ordersData, 'Order_Details')
  .then(res => {
    console.log("orderData seeded successfully", res);
  })
  .catch(err => {
    console.error("Seeding error:", err);
  });
