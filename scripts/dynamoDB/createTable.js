/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: "xxxx",
  secretAccessKey: "xxxx",
  endpoint: "http://127.0.0.1:8000",
});
const dynamodb = new AWS.DynamoDB();

console.log("➤ DynamoDB Endpoint:", dynamodb.config.endpoint);

import * as tables from "./tables.js";  

const resetTable = async tableParams => {
  console.log("resetting table", tableParams.TableName);
  const existingTables = await dynamodb.listTables().promise();
  if (existingTables.TableNames.includes(tableParams.TableName)) {
    console.log(`table ${tableParams.TableName} already exists, deleting`);
    await dynamodb
      .deleteTable({ TableName: tableParams.TableName })
      .promise()
      .catch(e => {
        console.error(`error deleting table ${tableParams.TableName}`);
        throw e;
      });
  }

  const createResult = await dynamodb
    .createTable(tableParams)
    .promise()
    .catch(err => {
      console.error(
        `Unable to create table ${tableParams.TableName} . Error JSON:`,
        JSON.stringify(err, null, 2)
      );
      throw err;
    });
  console.log(
    "Created table. Table description JSON:",
    JSON.stringify(createResult, null, 2)
  );
  return createResult;
};

// call reset table against all tables with a defined config file.
const promises = Object.values(tables).map(resetTable);

Promise.all(promises)
  .then(() => {
    console.log("tables reset succesfully");
  })
  .catch(e => {
    console.error("error reseting tables", e);
  });
