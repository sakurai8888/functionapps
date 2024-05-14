const  df  = require("durable-functions");
df.app.activity("myActivity", {
    handler: async function (context) {
        return 'This is the output';
    },
});

const helloActivity = df.app.activity("hello", {
    handler: async function (input) {
        return `Hello, ${input}`;
    },
});

df.app.orchestration("helloSequence", function* (context) {
    context.log("Starting chain sample");

    const output = [];
    output.push(yield helloActivity("Tokyo"));
    output.push(yield helloActivity("Seattle"));
    output.push(yield helloActivity("Cairo"));

    return output;
});

/*
module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
*/




















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