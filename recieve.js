const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus"); 

// Define connection string and related Service Bus entity names here
const connectionString = "";
const topicName = ""; 
const subscriptionName = ""; 

async function main(){
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString); 
  const subscriptionClient = sbClient.createSubscriptionClient(topicName, subscriptionName);
  const receiver = subscriptionClient.createReceiver(ReceiveMode.receiveAndDelete);

  try {
    const messages = await receiver.receiveMessages(10);
    console.log("Received messages:");
    console.log(messages.map(message => message.body));

    await subscriptionClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});