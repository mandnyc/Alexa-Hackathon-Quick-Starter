'use strict';

/**
 * First, we import the alexa-sdk and ssml-builder libraries.
 * Note the ssml-builder is a third party library that is not a part of the core alexa-sdk.
 * We include this library because it greatly simplifies the creation of SSML.
 */
var Alexa = require("alexa-sdk");
var Speech = require("ssml-builder"); // For more information, see https://www.npmjs.com/package/ssml-builder

/**
 * Next, we need to export the entry point to the Lambda service.
 * Whenever Alexa Skills Kit sends a request to the Lambda function, this function, handler, is called.
 */
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context); // First, we create an alexa object.
    alexa.registerHandlers(handler); // Register our handler which contains multiple listeners

    // You can get the appId from the Developer Portal. This is recommended for security issue.
    // It ensures that the Lambda function only accepts requests sent by the skill you registered.
    alexa.appId = "Your_APP_ID";

    alexa.execute(); // Now we begin the execution of our skill
};

/**
 * As mentioned above, this object is a handler that contains multiple listeners.
 * In this example, there are three listeners 'LaunchRequest', 'HelloWorldIntent' and 'SayHello' which will get invoked
 * in response to when the event is emitted.
 */
var handler = {

    /**
     * This listener is called by the SDK when the skill is first launched.
     */
    'LaunchRequest': function () {
        this.emit('SayHello'); // By calling emit, we invoke the 'SayHello' listener which we define on line ???
    },

    /**
     * This intent listener is invoked when the user utters a phrase like "hello" or "say hello" which are
     * defined in the speechAssets/Utterances.txt file
     * Also note, this intent emits an event named 'SayHello'
     */
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },

    /**
     * In this listener, we use the third party library ssml-builder to construct a SSML string.
     */
    'SayHello': function () {
        var speech = new Speech();
        speech.say('Hello');
        speech.pause('500ms'); // this creates a delay in the speech synthesized voice of alexa
        speech.say('World');
        var speechOutput = speech.ssml(true); // we pass in true to exclude the speak tag and be compatible with the SDK
        this.emit(':tell', speechOutput); // we emit the built in ':tell' event to send back a response to the user
    }
};