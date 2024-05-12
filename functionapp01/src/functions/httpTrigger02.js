const { app } = require('@azure/functions');
const { df } = require('durable-functions');

/*
module.exports.MakeAPICall = async function (context,functioninput) {
    // Perform the API call asynchronously
    // ...
    const myoutput = functioninput;

    return `${myoutput}`;
};
*/




app.http('httpTrigger02', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {


        context.log(`Http function processed request for url "${request.url}"`);

        const name01 = request.query.get('name01') || await request.text() || 'world';
        const name02 = request.query.get('name02') || await request.text() || 'world';

        const result = await myfunction(name01,name02);
        //const result = name;
        console.log(result)
        return { body: `Hello how are you, ${result}!` };
    }
});





async function myfunction(functioninput01,functioninput02) {
    // Perform the API call asynchronously
    // ...
    const myoutput = functioninput01 +' ' + functioninput02;
    await delay(3000); 
    return `${myoutput}`;
};


function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};


module.exports.ChildActivity = async function (context) {
    const location = context.bindings.location;
  
    // Simulate an asynchronous operation (e.g., making an HTTP request)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Return a result
    return `Hello from ${location}!`;
  };


