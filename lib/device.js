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

var TAG = 'Device';

var DEVICE_ID = 1;

function formatErrorMessage(name, message) {
  return ["Error in device", "'" + name + "'", "- " + message].join(" ");
}

/**
 * Driver class
 *
 * @constructor Driver
 * @param {Object} [opts] driver options
 * @param {String} [opts.name] the driver's name
 * @param {Object} [opts.robot] the robot the driver belongs to
 * @param {Object} [opts.connection] the adaptor the driver works through
 * @param {Number} [opts.pin] the pin number the driver should have
 * @param {Number} [opts.interval=10] read interval in milliseconds
 */
var Device = module.exports = function Device(opts) {
	opts = opts || {};

	this.initDevice(opts);
}

/**
 * A base start function. Must be overwritten by a descendent.
 *
 * @throws Error if not overridden by a child class
 * @return {void}
 */
Device.prototype.start = function() {
  var message = formatErrorMessage(
    this.name,
    "Device#start method must be overwritten by descendant classes."
  );

  throw new Error(message);
}

/**
 * A base halt function. Must be overwritten by a descendent.
 *
 * @throws Error if not overridden by a child class
 * @return {void}
 */
Device.prototype.halt = function() {
  var message = formatErrorMessage(
    this.name,
    "Device#halt method must be overwritten by descendant classes."
  );

  throw new Error(message);
}

/**
 * Parse the device options.
 *
 * @param {Object} [opts] controller options
 * @param {String} [opts.name] the controller's name
 */
Device.prototype.initDevice = function(opts) {
	this.name = opts.name || "Device " + DEVICE_ID++;
}

/**
 * Return the device attributes.
 *
 * @return {Object}
 */
Device.prototype.getAttributes = function() {
  return {};
}

/**
 * Return the device commands.
 *
 * @return {Object}
 */
Device.prototype.getCommands = function() {
  return {};
}