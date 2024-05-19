/*
To debug this script , need to have Azurite Installed , 
also install Azurite extension, and init before debug . AzureStorageEmulator.exe init 
Then click on the button in the below screen. 

*/

const  df  = require("durable-functions");
df.app.activity("myActivity", {
    handler: async function (context) {
        return 'This is the output';
    },
});

function delay(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

df.app.activity("helloActivity01", {
    handler: async function (input) {
        const delayInSeconds = 5;
        await delay(delayInSeconds * 1000);
        return `hello ! ${input}`;
    },
});

df.app.activity("helloActivity02", {
    handler: async function (input) {
        const delayInSeconds = 10;
        await delay(delayInSeconds * 1000);
        return `delay longer ! ${input}`;
    },
});


df.app.orchestration("helloSequence", function* (context) {
    context.log("Starting chain sample");

    const output = [];
    output.push(yield context.df.callActivity("helloActivity01","Tokyo"));
    output.push(yield context.df.callActivity("helloActivity02","long"));
    output.push(yield context.df.callActivity("helloActivity01","short"));

    return output;
});


df.app.orchestration("helloSequence02", function* (context) {
  context.log("Starting chain sample");

  //const output = [];
  //const activity_maps = {"helloActivity01": "Tokyo", "helloActivity02": "long", "helloActivity01": "short"};
  const activity_maps = ["short","adsf","1212"];
  //const mapped = Object.entries(map).map(([k,v]) => `${k}_${v}`);
  //const activityPromises = Object.entries(activity_maps).map(([k,v]) => context.df.callActivity(k, v));
  const activityPromises = activity_maps.map((input) => context.df.callActivity("helloActivity01", input));
  /*
  output.push(yield context.df.callActivity("helloActivity01","Tokyo"));
  output.push(yield context.df.callActivity("helloActivity02","long"));
  output.push(yield context.df.callActivity("helloActivity01","short"));
  */

  
  const output = yield Promise.all(activityPromises); // has errors
  return output;
});




// Make an http trigger endpoint for the Orchestrator Function 
// Endpoint url http://localhost:7071/runtime/webhooks/durabletask/orchestrators/helloSequence , post method

module.exports = async function (context, req) {
    const functionName = "helloSequence"; // Replace with the name of your orchestrator function
    const client = df.getClient(context);
  
    try {
      // Start the Durable Function orchestration
      const instanceId = await client.startNew(functionName, undefined, req.body);
  
      // Return the instanceId as the HTTP response
      context.res = {
        status: 202,
        body: {
          instanceId: instanceId,
        },
      };
    } catch (error) {
      // Return the error message as the HTTP response
      context.res = {
        status: 500,
        body: {
          error: "An error occurred while starting the orchestration.",
          message: error.message,
        },
      };
    }
  };


/*
module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
*/










module.exports = async function (context, req) {
  const functionName = "helloSequence02"; // Replace with the name of your orchestrator function
  const client = df.getClient(context);

  try {
    // Start the Durable Function orchestration
    const instanceId = await client.startNew(functionName, undefined, req.body);

    // Return the instanceId as the HTTP response
    context.res = {
      status: 202,
      body: {
        instanceId: instanceId,
      },
    };
  } catch (error) {
    // Return the error message as the HTTP response
    context.res = {
      status: 500,
      body: {
        error: "An error occurred while starting the orchestration.",
        message: error.message,
      },
    };
  }
};










/*

//THERE IS PROBLEM in the http trigger function

df.app.http('durableHello1HttpStart', {
    route: 'orchestrators/{orchestratorName}',
    extraInputs: [df.input.durableClient()],
    handler: async (request, context) => {
        const client = df.getClient(context);
        const body = await request.text();
        const instanceId = await client.startNew(request.params.orchestratorName, { input: body });

        context.log(`Started orchestration with ID = '${instanceId}'.`);

        return client.createCheckStatusResponse(request, instanceId);
    },
});
*/




/*
const activityName = 'durableHello1';

/*
df.app.orchestration('durableHello1Orchestrator', function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
});
*/

/*
df.app.activity(activityName, {
    handler: (input) => {
        return `Hello, ${input}`;
    },
});
*/



/*
df.app.http('durableHello1HttpStart', {
    route: 'orchestrators/{orchestratorName}',
    extraInputs: [df.input.durableClient()],
    handler: async (request, context) => {
        const client = df.getClient(context);
        const body = await request.text();
        const instanceId = await client.startNew(request.params.orchestratorName, { input: body });

        context.log(`Started orchestration with ID = '${instanceId}'.`);

        return client.createCheckStatusResponse(request, instanceId);
    },
});



*/