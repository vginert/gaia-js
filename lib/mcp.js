/**
 * The MIT License
 *
 * Copyright (c) 2016 Vicente Giner Tendero
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const TAG = 'MCP';

var Logger = require('./logger');

var EventEmitter = require("events").EventEmitter;

var mcp = module.exports = new EventEmitter();

mcp.devices = [];
mcp.controllers = [];

mcp.events = [ "device_added", "device_removed", "controller_added", "controller_removed" ];

/**
 * Add a device to the MCP.
 *
 * @param {Device} The device to add
 * @return {Device} The device added
 */
mcp.addDevice = function addDevice(device) {
	mcp.devices.push(device);
	mcp.emit("device_added", device.name);
	Logger.debug(TAG, 'Device added');
	return device;
}

/**
 * Add a controllers to the MCP.
 *
 * @param {Controller} The controller to add
 * @return {Controller} The controller added
 */
mcp.addController = function addController(controller) {
	mcp.controllers.push(controller);
	mcp.emit("controller_added", controller.name);
	Logger.debug(TAG, 'Controller added');
	return controller;
}

/**
 * Start all MCP devices and controllers.
 *
 * @param {Function} callback function to call when done starting all device and controlles
 * @return {void}
 */
mcp.start = function start(callback) {
	callback = callback || function() {};

	Logger.log(TAG, 'Starting...');

	// Start all devices
	mcp.devices.forEach(function(device) {
		device.start();
	});

	// Start all controllers
	mcp.controllers.forEach(function(controller) {
		controller.start();
	});

    callback();
};

/**
 * Halts all MCP devices and controllers.
 *
 * @param {Function} callback function to call when done halting all device and controlles
 * @return {void}
 */
mcp.halt = function halt(callback) {
	callback = callback || function() {};

	Logger.log(TAG, 'Halting...');

	// Halt all controllers
	mcp.controllers.forEach(function(controller) {
		controller.halt();
	});

	// Halt all devices
	mcp.devices.forEach(function(device) {
		device.halt();
	});

    callback();
};
