const { app } = require('@azure/functions');


/*
module.exports.MakeAPICall = async function (context,functioninput) {
    // Perform the API call asynchronously
    // ...
    const myoutput = functioninput;

    return `${myoutput}`;
};
*/

async function myfunction(functioninput01,functioninput02) {
    // Perform the API call asynchronously
    // ...
    const myoutput = functioninput01 +' ' + functioninput02;

    return `${myoutput}`;
};

app.http('httpTrigger01', {
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


