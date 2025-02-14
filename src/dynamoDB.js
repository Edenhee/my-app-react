import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Configure the DynamoDB client
const client = new DynamoDBClient({
    region: "process.env.AWS_REGION",  // Find in .env
    credentials: {
        accessKeyId: "process.env.AWS_ACCESS_KEY_ID",   // Find in .env
        secretAccessKey: "process.env.AWS_SECRET_ACCESS_KEY" // Find in .env
    }
});

const docClient = DynamoDBDocumentClient.from(client);

async function fetchDynamoDBData() {
    try {
        const command = new ScanCommand({
            TableName: "process.env.AWS_TABLE_HARVESTING_S",  // Find in .env
            Limit: 10,  // Fetch only the latest 10 records
        });

        const response = await docClient.send(command);
        return response.Items || [];
    } catch (error) {
        console.error("Error fetching latest data from DynamoDB:", error);
        return [];
    }
}

export default fetchDynamoDBData;
