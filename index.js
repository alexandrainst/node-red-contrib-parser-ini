'use strict';
/**
 * Command-line interface for the json-multi-schema Node-RED nodes.
 *
 * Script to run our Node-RED nodes from terminal without Node-RED and using STDIN / STDOUT.
 */

// Load fake/mocked Node-RED
const RED = require('node-red-contrib-mock-cli');
const noderedNode = RED.load(require.main);

if (noderedNode) {
	RED.run();
} else {
	console.error('Error loading Node-RED node!');
}
