export const order_details = {
    TableName: "Order_Details",
    KeySchema: [
      { AttributeName: "transaction_id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "transaction_id", AttributeType: "S" },
      { AttributeName: "payment_status", AttributeType: "S" },
      { AttributeName: "user_id", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "payment_status_index",
        KeySchema: [{ AttributeName: "payment_status", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
      {
        IndexName: "user_index",
        KeySchema: [{ AttributeName: "user_id", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
};
