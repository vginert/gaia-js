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

var TAG = 'MCP';

var Logger = require('./logger');

var mcp = module.exports = function mcp() {};

mcp.started = false;
mcp.devices = [];
mcp.controllers = [];

/**
 * Add a device to the MCP.
 *
 * @param {Device} The device to add
 * @return {Device} The device added
 */
mcp.addDevice = function addDevice(device) {
	mcp.devices.push(device);
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
	Logger.debug(TAG, 'Controller added');
	return controller;
}

/**
 * Get a device previously added to the MCP.
 *
 * @param {Device} The device name
 * @return {Device} The device
 */
mcp.getDevice = function getDevice(name) {
	// Search in all devices
	for (var i = 0; i < mcp.devices.length; i++) {
    	if(mcp.devices[i].name == name) {
			return mcp.devices[i];
		}
	}
}

/**
 * Get a controller previously added to the MCP.
 *
 * @param {name} The controller name
 * @return {Controller} The controller
 */
mcp.getController = function getController(name) {
	// Search in all controllers
	for (var i = 0; i < mcp.controllers.length; i++) {
    	if(mcp.controllers[i].name == name) {
			return mcp.controllers[i];
		}
	}
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
	for (var i = 0; i < mcp.devices.length; i++) {
		mcp.devices[i].start();
	}

	// Start all controllers
	for (var i = 0; i < mcp.controllers.length; i++) {
		mcp.controllers[i].start();
	}
	
	mcp.started = true;
	Logger.log(TAG, 'Running...');

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
	for (var i = 0; i < mcp.devices.length; i++) {
		mcp.devices[i].halt();
	}

	// Halt all devices
	for (var i = 0; i < mcp.controllers.length; i++) {
		mcp.controllers[i].halt();
	}

	mcp.started = false;

    callback();
};
