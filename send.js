const { ServiceBusClient } = require("@azure/service-bus"); 

// Define connection string and related Service Bus entity names here
const connectionString = "";
const topicName = ""; 

async function main(){
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString); 
  const topicClient = sbClient.createTopicClient(topicName);
  const sender = topicClient.createSender();

    try {
        for (let i = 0; i < 10; i++) {
          const message= {
            body: `Hello world! ${i}`,
            label: `test`,
            userProperties: {
                myCustomPropertyName: `my custom property value ${i}`
            }
          };
          console.log(`Sending message: ${message.body}`);
          await sender.send(message);
        }

        await topicClient.close();
      } finally {
        await sbClient.close();
      }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});