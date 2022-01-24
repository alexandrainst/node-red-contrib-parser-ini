module.exports = function (RED) {
	'use strict';
	const ini = require('ini');
	function ParserIniNode(n) {
		RED.nodes.createNode(this, n);
		this.property = n.property || 'payload';
		const node = this;
		this.on('input', function (msg) {
			let value = RED.util.getMessageProperty(msg, node.property);
			if (value !== undefined) {
				if (typeof value === 'string') {
					try {
						value = ini.parse(value);
						RED.util.setMessageProperty(msg, node.property, value);
						node.send(msg);
					} catch (e) {
						node.error(e.message, msg);
					}
				} else if (typeof value === 'object') {
					if (!Buffer.isBuffer(value)) {
						try {
							value = ini.stringify(value);
							RED.util.setMessageProperty(msg, node.property, value);
							node.send(msg);
						} catch (e) {
							node.error(RED._('parser-ini.errors.dropped-error'));
						}
					} else {
						node.warn(RED._('parser-ini.errors.dropped-object'));
					}
				} else {
					node.warn(RED._('parser-ini.errors.dropped'));
				}
			} else {
				node.send(msg);	// If no payload - just pass it on.
			}
		});
	}
	RED.nodes.registerType('parser-ini', ParserIniNode);
};
